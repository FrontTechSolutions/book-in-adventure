const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../domain/user/User.model');

// Utilitaire pour valider les champs requis selon le rôle
function validateUserInput(body) {
  const errors = [];
  if (!body.email) errors.push('Email requis');
  if (!body.password) errors.push('Mot de passe requis');
  if (!body.lastName) errors.push('Nom requis');
  if (!body.firstName) errors.push('Prénom requis');
  if (!body.role) errors.push('Rôle requis');
  if (!['client', 'pro'].includes(body.role)) errors.push('Rôle invalide');

  if (body.role === 'pro') {
    if (!body.phone) errors.push('Téléphone requis');
    if (!body.companyName) errors.push("Nom de l'entreprise requis");
    if (!body.companyAddress) errors.push("Adresse de l'entreprise requise");
    if (!body.activityDescription) errors.push("Description de l'activité requise");
  }
  return errors;
}

exports.register = async (req, res) => {
  try {
    const errors = validateUserInput(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const { email, password, lastName, firstName, phone, role, companyName, companyAddress, activityDescription, profilePhoto, birthDate, logo, openingHours, website } = req.body;

    // Vérifier unicité email
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email déjà utilisé' });

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Construction du user
    const userData = {
      email,
      password: hashedPassword,
      lastName,
      firstName,
      phone,
      role,
      notifications: {},
      registrationDate: new Date(),
    };
    if (role === 'client') {
      if (profilePhoto) userData.profilePhoto = profilePhoto;
      if (birthDate) userData.birthDate = birthDate;
    } else if (role === 'pro') {
      userData.companyName = companyName;
      userData.companyAddress = companyAddress;
      userData.activityDescription = activityDescription;
      if (logo) userData.logo = logo;
      if (openingHours) userData.openingHours = openingHours;
      if (website) userData.website = website;
      // TODO: Stripe onboarding à intégrer ici
    }

    const user = await User.create(userData);

    // Génération du JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });

    res.status(201).json({ user: { id: user._id, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.update = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = { ...req.body };
    // Empêcher la mise à jour de certains champs sensibles
    delete updateData.role;
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
    if (!updatedUser) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis' });  
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
    res.status(200).json({ user: { id: user._id, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
