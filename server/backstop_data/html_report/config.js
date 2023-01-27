report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_BackstopJS_Homepage_0_document_0_phone.png",
        "test": "..\\bitmaps_test\\20230128-070220\\backstop_default_BackstopJS_Homepage_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_BackstopJS_Homepage_0_document_0_phone.png",
        "label": "BackstopJS Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://www.freelancer.com/search/projects/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": -18750
          },
          "rawMisMatchPercentage": 1.0417804212168487,
          "misMatchPercentage": "1.04",
          "analysisTime": 73
        },
        "diffImage": "..\\bitmaps_test\\20230128-070220\\failed_diff_backstop_default_BackstopJS_Homepage_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_BackstopJS_Homepage_0_document_1_tablet.png",
        "test": "..\\bitmaps_test\\20230128-070220\\backstop_default_BackstopJS_Homepage_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_BackstopJS_Homepage_0_document_1_tablet.png",
        "label": "BackstopJS Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://www.freelancer.com/search/projects/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": -12347
          },
          "rawMisMatchPercentage": 2.5162698365421274,
          "misMatchPercentage": "2.52",
          "analysisTime": 159
        },
        "diffImage": "..\\bitmaps_test\\20230128-070220\\failed_diff_backstop_default_BackstopJS_Homepage_0_document_1_tablet.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});