import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || 'fallback_secret_must_be_32_bytes_';

// Ensure the secret is exactly 32 bytes for aes-256-cbc
const SECRET_KEY = crypto.createHash('sha256').update(String(ENCRYPTION_SECRET)).digest('base64').substring(0, 32);

export const encrypt = (text: string): string => {
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        // Return iv and encrypted text joined by ':'
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt data');
    }
};

export const decrypt = (text: string): string => {
    try {
        const textParts = text.split(':');
        const ivHex = textParts.shift();
        
        if (!ivHex || textParts.length === 0) {
            // Not in encrypted format, maybe it's plain text (legacy)
            return text;
        }

        const iv = Buffer.from(ivHex, 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
        
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        
        return decrypted.toString();
    } catch (error) {
        // If decryption fails, it might be plain text
        console.warn('Decryption failed, assuming plain text or corrupted data.');
        return text;
    }
};
