import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../domain/user/User.model.js';
import { generateVerificationCode, hashCode } from '../../utils/verifyAccount.js';
import { sendVerificationEmail } from '../../services/localMail.js';
import type { Request, Response } from 'express';


// Utilitaire pour valider les champs requis selon le rôle
function validateUserInput(body: any) {
  const errors: string[] = [];
  if (!body.email) errors.push('error.email_required');
  if (!body.password) errors.push('error.password_required');
  if (!body.lastName) errors.push('error.lastname_required');
  if (!body.firstName) errors.push('error.firstname_required');
  if (!body.role) errors.push('error.role_required');
  if (!['client', 'pro'].includes(body.role)) errors.push('error.role_invalid');

  if (body.role === 'pro') {
    if (!body.phone) errors.push('error.phone_required');
    if (!body.companyName) errors.push('error.companyname_required');
    if (!body.companyAddress) errors.push('error.companyaddress_required');
    if (!body.activityDescription) errors.push('error.activitydescription_required');
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
        return res.status(409).json({ error: 'error.account_creation_failed' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const code:string = generateVerificationCode();
      console.log('Generated verification code:', code);

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

      //TODO decommenter quand le mailer sera fonctionnel
      // try {
      //   await sendVerificationEmail(email, code);
      // } catch (err) {
      //   await User.findByIdAndDelete(user._id);
      //   throw err;
      // }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
      res.status(201).json({ user: { id: user._id, email: user.email, role: user.role }, token, message: 'success.account_created' });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'error.server' });
    }
  },

  /**
   * UPDATE
   */
  update: async (req: any, res: any) => {
    try {
      const userId = req.params.id;
      const updateData = { ...req.body };
      if (!req.user || req.user.id !== userId) {
        return res.status(403).json({ error: 'error.forbidden' });
      }      
      // Empêcher la mise à jour de certains champs sensibles
      delete updateData.password;
      delete updateData.email;
      delete updateData.role;
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
      if (!updatedUser) return res.status(404).json({ error: 'error.user_not_found' });
      res.status(200).json({ user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'error.server' });
    }
  },

  /**
   * LOGIN
   */
  login: async (req: any, res: any) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'error.email_password_required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'error.invalid_credentials' });
      }

      if (!user.isVerified) {
        return res.status(403).json({ error: 'error.account_not_verified' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'error.invalid_credentials' });
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
      res.status(500).json({ error: 'error.server' });
    }
  },

  /**
   * GET USER BY ID
   */
  getUserById: async (req: any, res: any) => {
    try {
      const userId = req.params.id;
      // Vérification de sécurité : l'utilisateur ne peut accéder qu'à ses propres infos
      if (!req.user || req.user.id !== userId) {
        return res.status(403).json({ error: 'error.forbidden' });
      }
      const user = await User.findById(userId).select('-password');
      if (!user) return res.status(404).json({ error: 'error.user_not_found' });
      res.status(200).json({ user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, phone: user.phone, isVerified: user.isVerified, birthDate: user.birthDate } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'error.server' });
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
        return res.status(404).json({ error: 'error.user_not_found' });
      }

      if (!req.user || req.user.id !== user._id.toString()) {
        return res.status(403).json({ error: 'error.forbidden' });
      }      

      if (!user) {
        return res.status(404).json({ error: 'error.user_not_found' });
      }

      if (user.isVerified) {
        return res.status(400).json({ error: 'error.account_already_verified' });
      }

      if (user.verificationAttempts >= 5) {
        return res.status(429).json({ error: 'error.too_many_attempts' });
      }

      if (!user.verificationCodeExpiresAt || new Date(user.verificationCodeExpiresAt).getTime() < Date.now()) {
        return res.status(400).json({ error: 'error.code_expired' });
      }

      if (hashCode(code) !== user.verificationCodeHash) {
        user.verificationAttempts += 1;
        await user.save();
        return res.status(400).json({ error: 'error.code_invalid' });
      }

      user.isVerified = true;
      user.verificationCodeHash = '';
      user.verificationCodeExpiresAt = new Date(0);
      user.verificationAttempts = 0;
      await user.save();

      res.json({ message: 'success.account_verified', user: { id: user._id, email: user.email, role: user.role, isVerified: user.isVerified } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'error.server' });
    }
  },

  /**
   * PASSWORD RESET - REQUEST 
   */
  passwordRequestCode: async (req: any, res: any) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'error.user_not_found' });
      }
      if (!req.user || req.user.id !== user._id.toString()) {
        return res.status(403).json({ error: 'error.forbidden' });
      }

      const code = generateVerificationCode();
      console.log('Generated password reset code:', code);
      user.passwordRequestCodeHash = hashCode(code);
      user.passwordResetExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
      user.passwordResetAttempts = 0;
      await user.save();

      // TODO decommenter quand le mailer sera fonctionnel
      // try{
      //   await sendVerificationEmail(email, code);
      // } catch(err){
      //   console.error('Error sending password reset email:', err);
      //   return res.status(500).json({ error: 'error.email_sending_failed' });
      // }

      res.json({ message: 'success.code_sent' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'error.server' });
    }
  },


  passwordConfirmCode: async (req: Request, res: Response) => {
    try {
      const { email, code } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'error.user_not_found' });
      }
      if (!req.user || req.user.id !== user._id.toString()) {
        return res.status(403).json({ error: 'error.forbidden' });
      }
      if (!user.passwordResetExpiresAt || user.passwordResetExpiresAt.getTime() < Date.now()) {
        return res.status(400).json({ error: 'error.code_expired' });
      }
      if (hashCode(code) !== user.passwordRequestCodeHash) {
        return res.status(400).json({ error: 'error.code_invalid' });
      }
      user.passwordIsVerified = true;
      await user.save();
      res.json({ success: true, code: code, message: 'success.code_valid' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'error.server' });
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

      if (!user) {
        return res.status(404).json({ error: 'error.user_not_found' });
      }
      if (!req.user || req.user.id !== user._id.toString()) {
        return res.status(403).json({ error: 'error.forbidden' });
      }

      // Vérifier le nombre de tentatives
      if (user.passwordResetAttempts >= 5) {
        return res.status(429).json({ error: 'error.too_many_attempts' });
      }

      // Vérifier le mot de passe actuel
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!passwordMatch) {
        user.passwordResetAttempts += 1;
        await user.save();
        return res.status(401).json({ error: 'error.current_password_incorrect' });
      }

      // Mettre à jour le mot de passe
      user.password = await bcrypt.hash(newPassword, 10);

      // Nettoyer les champs liés au reset
      user.passwordRequestCodeHash = '';
      user.passwordResetExpiresAt = new Date(0);
      user.passwordResetAttempts = 0;
      user.passwordIsVerified = false;

      await user.save();

      res.json({ success: true, message: 'success.password_updated' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'error.server' });
    }
  },

  emailRequest: async (req: any, res: any) => {
    try {
      const { newEmail, password } = req.body;
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'error.unauthenticated' });
      }
      const userId = req.user.id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'error.user_not_found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'error.invalid_credentials' });
      }

      // Vérifier que l'email n'est pas déjà utilisé
      const emailExists = await User.findOne({ email: newEmail });
      if (emailExists) {
        return res.status(409).json({ error: 'error.email_already_used' });
      }

      const code = generateVerificationCode();
      console.log('Generated email change code:', code);

      user.emailRequestNewEmail = newEmail;
      user.emailRequestCodeHash = hashCode(code);
      user.emailRequestExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
      user.emailRequestAttempts = 0;

      await user.save();

      //TODO decommenter quand le mailer sera fonctionnel
      // try{
      //   await sendVerificationEmail(newEmail, code);
      // } catch(err){
      //   console.error('Error sending password reset email:', err);
      //   return res.status(500).json({ error: 'error.email_sending_failed' });
      // }      

      res.json({
        success: true,
        message: 'success.code_sent',
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'error.server' });
    }
  },

  emailConfirmCode: async (req: any, res: any) => {
    try {
      const { code } = req.body;
      const userId = req.user.id;
      console.log('Email change confirm for user userId:', userId);

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'error.user_not_found' });
      }
      if (!req.user || req.user.id !== user._id.toString()) {
        return res.status(403).json({ error: 'error.forbidden' });
      }

      // Vérifier qu'une demande existe
      if (
        !user.emailRequestNewEmail ||
        !user.emailRequestCodeHash ||
        !user.emailRequestExpiresAt
      ) {
        return res.status(400).json({ error: 'error.no_email_request' });
      }

      // Vérifier expiration
      if (user.emailRequestExpiresAt.getTime() < Date.now()) {
        return res.status(400).json({ error: 'error.code_expired' });
      }

      // Vérifier le code
      if (hashCode(code) !== user.emailRequestCodeHash) {
        user.emailRequestAttempts += 1;

        // Trop de tentatives → on invalide tout
        if (user.emailRequestAttempts >= 5) {
          user.emailRequestCodeHash = '';
          user.emailRequestExpiresAt = new Date(0);
          user.emailRequestNewEmail = '';
          user.emailRequestAttempts = 0;
        }

        await user.save();
        return res.status(400).json({ error: 'error.code_invalid' });
      }

      // Vérifier à nouveau que l'email n'est pas déjà pris (race condition)
      const emailExists = await User.findOne({
        email: user.emailRequestNewEmail,
      });
      if (emailExists) {
        return res.status(409).json({ error: 'error.email_already_used' });
      }

      // Appliquer le changement d'email
      user.email = user.emailRequestNewEmail;

      // Nettoyage
      user.emailRequestNewEmail = '';
      user.emailRequestCodeHash = '';
      user.emailRequestExpiresAt = new Date(0);
      user.emailRequestAttempts = 0;

      await user.save();

      res.json({
        success: true,
        message: 'success.email_updated',
        user: { id: user._id, email: user.email, role: user.role, isVerified: user.isVerified }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'error.server' });
    }
  },


};

export default authController;



