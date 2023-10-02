module.exports = {
  branches: ['main'],
  repositoryUrl: 'https://github.com/ra-libs/nx-libraries',
  gitAssets: [
    'package-lock.json',
    '${PROJECT_DIR}/CHANGELOG.md',
    '${PROJECT_DIR}/package.json',
  ],
  outputPath: 'dist/packages/${PROJECT_NAME}',
  buildTarget: 'build',
  commitMessage:
    'chore(release): ${PROJECT_NAME} ${nextRelease.version}\n\n${nextRelease.notes}',
};
