const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCyBtdggQpRXZxzfttSYsE9GqGY9cMdEUfP5akqyBkySlEYbcz7
t7Qr39b82ka3XTUthirhcrXn91C+TCuX659+zlQEFyJENUdOx70ld7wPYbCbLIb5
pFEkzFUBhCGxFtkw7/TSkrfmBXKOH6lkfD27QcmZK/ZWhhtxEomhGkIGjQIDAQAB
AoGAUunix5xx7MFXi2cKyM0byNStbKsRq2kP9CC3cChvq793E5SYAqhlboW7AFq8
0svDZ6d0MzoUxKun3GlnaEMiLcrcy87SMPPQTE1BNOE01rS6887HkdgqzWke41Bp
+WCFVgZjY1RPhxAeYFvNpiVW/5p+FQ5ofEaacN2KX5XjIbUCQQDgK2bbe6I/Ktb2
D5FxvTKlpnvGN689gyatAlvC7nFUv1SUa5eDR7JsXk+CTPhrCRldJnzFpANSbLLg
t5JLGmtPAkEAy04kE29HksfMkxsavgLjiB4lhkUWL4LoBd+yySYVQavmrRBTCqaD
bfUMhFVz7zYeDUikk8RO/8s65PnLgj9JYwJAbVmenhgsKAYcwAEOIN5680VIAYQu
TqJIXoLVAjzQOdfvSUtGqHpz9dr3jAdB8uyIW+EnYj3EhROTGn1RtqMXjwJAOTTm
r9VLNYElDmu9DaRwc9fPxUVhZcMXGLgGbdVae90sDpyeUUvjhahDemU1NyVqNWCw
dqfxdsav7shfPGokcwJAQ52kx+DycsBKgr3nSR6WzwMAPa4U7fy3PVgSE9w5fd88
kmbxuBoEZXyX3cWBdfckHKflYcSyHxd/K8z7a06ypA==
-----END RSA PRIVATE KEY-----`;

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyBtdggQpRXZxzfttSYsE9GqGY
9cMdEUfP5akqyBkySlEYbcz7t7Qr39b82ka3XTUthirhcrXn91C+TCuX659+zlQE
FyJENUdOx70ld7wPYbCbLIb5pFEkzFUBhCGxFtkw7/TSkrfmBXKOH6lkfD27QcmZ
K/ZWhhtxEomhGkIGjQIDAQAB
-----END PUBLIC KEY-----`;

module.exports = {
  port: process.env.PORT || 1000,
  mongoURL:
    process.env.MONGO_URL ||
    'mongodb+srv://root:root@cluster0.10g9w.mongodb.net/moviebookingdb?retryWrites=true&w=majority',
  env: process.env.NODE_ENV || 'development',
  secret_key: 'moviebookingvalid',
  sk_time_life: 2678400,
  privateKey: privateKey,
  publicKey: publicKey
};
