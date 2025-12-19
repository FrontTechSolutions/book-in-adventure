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
