module.exports = {
  "google":{
    "client_id":"933653642547-f6vdqcneg5udavse7a6sq2du42t1mv4k.apps.googleusercontent.com",
    "client_secret":"ERxPFuKPJJ9FjlUODofWBE_P",
    "redirect_uris":["http://localhost:3000/autenticacio/google/callback"]
  },

  "facebook":{
    "client_id":"311850462584739",
    "client_secret":"935739058cacf9a5986f61bfc8720be4",
    "redirect_uris":["http://localhost:3000/autenticacio/facebook/callback"],
    "profileFields":['email' , 'id' , 'name' , 'profileUrl'],
  },

  "drive":{
    "client_id":"933653642547-hk6j3uek9obf2ikh1hjmeni6u1ar3erb.apps.googleusercontent.com",
    "project_id":"doubleart-161408",
    "auth_uri":"https://accounts.google.com/o/oauth2/auth",
    "token_uri":"https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
    "client_secret":"jD3V9r0qqN-Ips2OHbgt5bbL",
    "redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]
  }
}
