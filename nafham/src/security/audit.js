const { exec } = require('child_process');

console.log('🛡️  Running Security Audit for Frontend Dependencies...\n');

exec('npm audit', (error, stdout, stderr) => {
  if (error) {
    console.error(`\n⚠️  Security vulnerabilities found!\n`);
    console.log(stdout);
    console.log('\n💡 Tip: Run "npm audit fix" to try to automatically fix them.');
    process.exit(1);
  } else {
    console.log('✅ Security audit passed. No known vulnerabilities found.\n');
    console.log(stdout);
    process.exit(0);
  }
});
