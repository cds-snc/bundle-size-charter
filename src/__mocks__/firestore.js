const reports = [
  {
    timestamp: 1544798303225,
    files: [
      {
        filename: "bundle.js",
        filesize: 35421
      },
      {
        filename: "template/index.html",
        filesize: 210
      }
    ]
  },
  {
    timestamp: 1544799918982,
    files: [
      {
        filename: "bundle.js",
        filesize: 45421
      },
      {
        filename: "template/index.html",
        filesize: 410
      }
    ]
  }
];

export const fixtureData = {
  __collection__: {
    bundle_sizes: {
      __doc__: {
        abcd: {
          sha: "bcb9ef283900698971b4e1c44817943793ef22f7",
          timestamp: 1545931001230,
          branch: "refs/heads/master",
          repo: "cds-snc/bundle-size-tracker-demo-app",
          data: [
            {
              timestamp: 1545931001063,
              files: [
                { filesize: 36717, filename: "bundle.js" },
                { filename: "index.html", filesize: 4474 }
              ]
            }
          ]
        },
        efgh: {
          repo: "cds-snc/bundle-size-tracker-demo-app",
          sha: "efgh",
          timestamp: 1544562468330,
          branch: "refs/heads/test",
          data: reports[1]
        }
      }
    }
  }
};
