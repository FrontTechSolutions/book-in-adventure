import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../domain/user/User.model.js';
import { generateVerificationCode, hashCode } from '../../utils/verifyAccount.js';
import { sendVerificationEmail } from '../../services/localMail.js';
import type { Request, Response } from 'express';


// Utilitaire pour valider les champs requis selon le rôle
function validateUserInput(body: any) {
  const errors: string[] = [];
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

const authController = {
  /**
   * REGISTER
   */
  register: async (req: any, res: any) => {
    try {
      const errors = validateUserInput(req.body);
      if (errors.length) return res.status(400).json({ errors });

      const {
        email,
        password,
        lastName,
        firstName,
        phone,
        role,
        companyName,
        companyAddress,
        activityDescription,
        birthDate,
        logo,
        openingHours,
        website
      } = req.body;

      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(409).json({ error: 'Impossible de créer le compte' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const code:string = generateVerificationCode();

      const userData: any = {
        email,
        password: hashedPassword,
        lastName,
        firstName,
        phone,
        birthDate,
        role,
        notifications: {},
        registrationDate: new Date(),
        isVerified: false,
        verificationCodeHash: hashCode(code),
        verificationCodeExpiresAt: Date.now() + 15 * 60 * 1000,
        verificationAttempts: 0,
      };

      if (role === 'pro') {
        userData.companyName = companyName;
        userData.companyAddress = companyAddress;
        userData.activityDescription = activityDescription;
        if (logo) userData.logo = logo;
        if (openingHours) userData.openingHours = openingHours;
        if (website) userData.website = website;
      }

      const user = await User.create(userData);

      try {
        await sendVerificationEmail(email, code);
      } catch (err) {
        await User.findByIdAndDelete(user._id);
        throw err;
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
      res.status(201).json({ user: { id: user._id, email: user.email, role: user.role }, token, message: 'Compte créé. Vérifiez votre email pour activer le compte.', });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  /**
   * UPDATE
   */
  update: async (req: any, res: any) => {
    try {
      const userId = req.params.id;
      const updateData = { ...req.body };
      // Empêcher la mise à jour de certains champs sensibles
      delete updateData.password;
      delete updateData.email;
      delete updateData.role;
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
      if (!updatedUser) return res.status(404).json({ error: 'Utilisateur non trouvé' });
      res.status(200).json({ user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  /**
   * LOGIN
   */
  login: async (req: any, res: any) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }

      if (!user.isVerified) {
        return res.status(403).json({ error: 'Compte non vérifié' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'dev_secret',
        { expiresIn: '7d' }
      );

      res.status(200).json({
        user: { id: user._id, email: user.email, role: user.role },
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  /**
   * GET USER BY ID
   */
  getUserById: async (req: any, res: any) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).select('-password');
      if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
      res.status(200).json({ user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, phone: user.phone, isVerified: user.isVerified, birthDate: user.birthDate } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  /**
   * VERIFY ACCOUNT
   */
  verifyAccount: async (req: any, res: any) => {
    try {
      const { email, code } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'Utilisateur introuvable' });
      }

      if (user.isVerified) {
        return res.status(400).json({ error: 'Compte déjà vérifié' });
      }

      if (user.verificationAttempts >= 5) {
        return res.status(429).json({ error: 'Trop de tentatives. Réessayez plus tard.' });
      }

      if (!user.verificationCodeExpiresAt || new Date(user.verificationCodeExpiresAt).getTime() < Date.now()) {
        return res.status(400).json({ error: 'Code expiré' });
      }

      if (hashCode(code) !== user.verificationCodeHash) {
        user.verificationAttempts += 1;
        await user.save();
        return res.status(400).json({ error: 'Code invalide' });
      }

      user.isVerified = true;
      user.verificationCodeHash = '';
      user.verificationCodeExpiresAt = new Date(0);
      user.verificationAttempts = 0;
      await user.save();

      res.json({ message: 'Compte vérifié avec succès', user: { id: user._id, email: user.email, role: user.role, isVerified: user.isVerified } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  /**
   * PASSWORD RESET - REQUEST 
   */
  passwordRequestCode: async (req: any, res: any) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });

      const code = generateVerificationCode();
      user.passwordRequestCodeHash = hashCode(code);
      user.passwordResetExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
      user.passwordResetAttempts = 0;
      await user.save();

      // À adapter selon ton service d'envoi d'email
      await sendVerificationEmail(email, code);

      res.json({ message: 'Code envoyé' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },


  passwordConfirmCode: async (req: Request, res: Response) => {
    try {
      const { email, code } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
      if (!user.passwordResetExpiresAt || user.passwordResetExpiresAt.getTime() < Date.now()) {
        return res.status(400).json({ error: 'Code expiré' });
      }
      if (hashCode(code) !== user.passwordRequestCodeHash) {
        return res.status(400).json({ error: 'Code invalide' });
      }
      user.passwordIsVerified = true;
      await user.save();
      res.json({ success: true, code: code, message: 'Code valide' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  /**
   * PASSWORD RESET - Confirmation 
   */
  passwordConfirm: async (req: any, res: any) => {
    try {
      const { code, currentPassword, newPassword } = req.body;

      // Trouver l'utilisateur avec le code valide et non expiré
      const user = await User.findOne({
        passwordRequestCodeHash: hashCode(code),
        passwordResetExpiresAt: { $gt: Date.now() }
      });

      if (!user)
        return res.status(400).json({ error: 'Code invalide ou expiré' });

      // Vérifier le nombre de tentatives
      if (user.passwordResetAttempts >= 5) {
        return res.status(429).json({ error: 'Trop de tentatives. Réessayez plus tard.' });
      }

      // Vérifier le mot de passe actuel
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!passwordMatch) {
        user.passwordResetAttempts += 1;
        await user.save();
        return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
      }

      // Mettre à jour le mot de passe
      user.password = await bcrypt.hash(newPassword, 10);

      // Nettoyer les champs liés au reset
      user.passwordRequestCodeHash = '';
      user.passwordResetExpiresAt = new Date(0);
      user.passwordResetAttempts = 0;
      user.passwordIsVerified = false;

      await user.save();

      res.json({ success: true, message: 'Mot de passe mis à jour' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
};

export default authController;



