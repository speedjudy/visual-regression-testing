report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_BackstopJS_Homepage_0_body_0_phone.png",
        "test": "..\\bitmaps_test\\20230128-044049\\backstop_default_BackstopJS_Homepage_0_body_0_phone.png",
        "selector": "body",
        "fileName": "backstop_default_BackstopJS_Homepage_0_body_0_phone.png",
        "label": "BackstopJS Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:3000/",
        "referenceUrl": "http://localhost:3001/",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 10.005859375,
          "misMatchPercentage": "10.01",
          "analysisTime": 12
        },
        "diffImage": "..\\bitmaps_test\\20230128-044049\\failed_diff_backstop_default_BackstopJS_Homepage_0_body_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_BackstopJS_Homepage_0_body_1_tablet.png",
        "test": "..\\bitmaps_test\\20230128-044049\\backstop_default_BackstopJS_Homepage_0_body_1_tablet.png",
        "selector": "body",
        "fileName": "backstop_default_BackstopJS_Homepage_0_body_1_tablet.png",
        "label": "BackstopJS Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:3000/",
        "referenceUrl": "http://localhost:3001/",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 2.5750478108723955,
          "misMatchPercentage": "2.58",
          "analysisTime": 26
        },
        "diffImage": "..\\bitmaps_test\\20230128-044049\\failed_diff_backstop_default_BackstopJS_Homepage_0_body_1_tablet.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_BackstopJS_Homepage_0_body_2_Nest_hub_max.png",
        "test": "..\\bitmaps_test\\20230128-044049\\backstop_default_BackstopJS_Homepage_0_body_2_Nest_hub_max.png",
        "selector": "body",
        "fileName": "backstop_default_BackstopJS_Homepage_0_body_2_Nest_hub_max.png",
        "label": "BackstopJS Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:3000/",
        "referenceUrl": "http://localhost:3001/",
        "expect": 0,
        "viewportLabel": "Nest hub max",
        "error": "Reference file not found F:\\backstopjs\\backstop_working\\visual-regression-testing\\backstop_data\\bitmaps_reference\\backstop_default_BackstopJS_Homepage_0_body_2_Nest_hub_max.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});