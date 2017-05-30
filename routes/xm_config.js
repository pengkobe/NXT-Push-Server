module.exports = {
  production: true,
  restrictedPackageName: 'org.isayme.pushdemo',
  appSecret: 'f',
  regids: [
    ''
  ],
  callback: function() {
    console.log(JSON.stringify(arguments, null, 2));
  }
};