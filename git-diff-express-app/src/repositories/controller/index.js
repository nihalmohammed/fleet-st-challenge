const { getCommitDetail } = require('../../../services/github');
const { parsePatch } = require('diff');

module.exports.getCommitById = async (res, parameters) => {
  let data;
  try {
    data = await getCommitDetail(parameters);

    const response = [
      {
        oid: parameters.oid,
        message: data.commit.message,
        author: {
          name: data.commit.author.name,
          date: data.commit.author.date,
          email: data.commit.author.email,
        },
        committer: {
          name: data.commit.committer.name,
          date: data.commit.committer.date,
          email: data.commit.committer.email,
        },
        parents: [],
      },
    ];

    data.parents.map((parent) => {
      response[0].parents.push({ oid: parent.sha });
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

const parseGitDiffLine = (data) => {
  console.log(data);
  const lines = data.split('\n');
  const hunks = [];
  let originalLineNumber = 0;
  let updatedLineNumber = 0;

  lines.forEach((line) => {
    if (line.startsWith('@@')) {
      originalLineNumber = parseInt(line.split(' -')[1].split(',')[0], 10);
      updatedLineNumber = parseInt(line.split(' +')[1].split(',')[0], 10);
      hunks.push({ header: line, lines: [] });
      return;
    }

    if (line.startsWith('+')) {
      hunks[hunks.length - 1].lines.push({
        baseLineNumber: originalLineNumber,
        headLineNumber: updatedLineNumber,
        line: line,
      });
      updatedLineNumber++;
    } else if (line.startsWith('-')) {
      hunks[hunks.length - 1].lines.push({
        baseLineNumber: originalLineNumber,
        headLineNumber: updatedLineNumber,
        line: line,
      });
      originalLineNumber++;
    } else {
      hunks[hunks.length - 1].lines.push({
        baseLineNumber: originalLineNumber,
        headLineNumber: updatedLineNumber,
        line: line,
      });
      originalLineNumber++;
      updatedLineNumber++;
    }
  });
  return hunks;
};

module.exports.getCommitDiffById = async (res, parameters) => {
  let data;
  try {
    data = await getCommitDetail(parameters);

    const response = [];
    data.files.map((file) => {
      if (file.patch) {
        const hunks = parseGitDiffLine(file.patch);
        console.log(hunks);
        response.push({
          changeKind: file.status,
          headFile: {
            path: 'cmd/repo-updater/repos/syncer.go',
          },
          baseFile: {
            path: 'cmd/repo-updater/repos/syncer.go',
          },
          hunks: hunks,
        });
      }
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};
