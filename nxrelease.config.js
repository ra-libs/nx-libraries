module.exports = {
  branches: ['main'],
  repositoryUrl: 'https://github.com/will-bank/debit-operations',
  gitAssets: [
    'package-lock.json',
    '${PROJECT_DIR}/CHANGELOG.md',
    '${PROJECT_DIR}/package.json',
  ],
  npm: false,
  buildTarget: 'build',
  commitMessage:
    'chore(release): ${PROJECT_NAME} ${nextRelease.version}\n\n${nextRelease.notes}',
};
