const prodConfig = {
  WEBSOCKETS_ENDPOINT:
    "wss://fyixbms64i.execute-api.ap-south-1.amazonaws.com/production",
  BASE_ENDPOINT:
    "https://8tp0dv93l1.execute-api.ap-south-1.amazonaws.com/prod/",
  PQC_ENDPOINT: "https://m6tmrwimwh.execute-api.ap-south-1.amazonaws.com",
  Welding_ENDPOINT: "https://a2ijfc6nfh.execute-api.ap-south-1.amazonaws.com",
  USER_ENDPOINT: "https://8tp0dv93l1.execute-api.ap-south-1.amazonaws.com",
  CPQM_ENDPOINT: "https://4vauu0swtd.execute-api.ap-south-1.amazonaws.com",
  CLM_ENDPOINT: "https://blyq190ami.execute-api.ap-south-1.amazonaws.com",
  SL_ENDPOINT: "https://b0l737apol.execute-api.ap-south-1.amazonaws.com",
  Image_ENDPOINT:
    "https://62srm9w40g.execute-api.ap-south-1.amazonaws.com/prod/artifacts/",
  SL_ENDPOINT: "https://b0l737apol.execute-api.ap-south-1.amazonaws.com",
  WORKFLOW_ENDPOINT:
    "https://8naoyqelql.execute-api.ap-south-1.amazonaws.com/approval/workflow/",

  SMM_ENDPOINT: "https://ap3okkpsv0.execute-api.ap-south-1.amazonaws.com", //TODO:USING QA endpoint,update with Prod endpoint
  QPULSE_ENPOINT: "https://6ssglzrqr7.execute-api.ap-south-1.amazonaws.com",
  PRESS_ENDPOINT: "https://ltr8d5c4sg.execute-api.ap-south-1.amazonaws.com",
  TITO_ENDPOINT: "https://sqadm779y1.execute-api.ap-south-1.amazonaws.com",
  TAG_CHECKIN: "https://sqadm779y1.execute-api.ap-south-1.amazonaws.com/",
  PROCHECK2_ENDPOINT:
    "https://vur5hxp6wc.execute-api.ap-south-1.amazonaws.com/",
  WORKFLOW2_ENDPOINT:
    "https://fzhesmhen8.execute-api.ap-south-1.amazonaws.com/",
  PRODIGI_ENDPOINT: "https://058s19a0z2.execute-api.ap-south-1.amazonaws.com",
  COGNITO_ENDPOINT:
    "https://msil-iot-platform-prod-new.auth.ap-south-1.amazoncognito.com",
  IDENTITY_ENDPOINT: "https://8tp0dv93l1.execute-api.ap-south-1.amazonaws.com",
  CLIENT_ID: "55mh5je67n2sh0pnhi18ggmttp",
  CLIENT_SECRET: "1m9pr116dk2lh5etidtbekn0uha79l8hcegfms906d7jjjmguplp",
  IDENTITY_AUTHORIZER:
    "Basic NTVtaDVqZTY3bjJzaDBwbmhpMThnZ210dHA6MW05cHIxMTZkazJsaDVldGlkdGJla24wdWhhNzlsOGhjZWdmbXM5MDZkN2pqam1ndXBscA==",
  REDIRECT_URL: "https://marutisuzukiiotspace.com/Login",
  AUGMAINT_ENDPOINT: "", //TODO: Update
};

const devConfig = {
  Base_ENDPOINT: "https://8oasd6aw1k.execute-api.ap-south-1.amazonaws.com/dev/",
  BASE_ENDPOINT: "https://jejciovhfb.execute-api.ap-south-1.amazonaws.com/",
  Welding_ENDPOINT: "https://54b3pu1zca.execute-api.ap-south-1.amazonaws.com",
  PQC_ENDPOINT: "https://qi7uyvsuba.execute-api.ap-south-1.amazonaws.com",
  USER_ENDPOINT: "https://qczgq0f299.execute-api.ap-south-1.amazonaws.com",
  CPQM_ENDPOINT: "https://bi17behkdl.execute-api.ap-south-1.amazonaws.com",
  CLM_ENDPOINT: "https://rntqws9s76.execute-api.ap-south-1.amazonaws.com",
  SL_ENDPOINT: "https://w9w4r5m4f3.execute-api.ap-south-1.amazonaws.com",
  PRESS_ENDPOINT: "https://q4knovzhsf.execute-api.ap-south-1.amazonaws.com",
  WORKFLOW_ENDPOINT:
    "https://4s14jpcv7f.execute-api.ap-south-1.amazonaws.com/approval/workflow/",

  WEBSOCKETS_ENDPOINT:
    "wss://akmcur8z29.execute-api.ap-south-1.amazonaws.com/production",
  Image_ENDPOINT:
    "https://62srm9w40g.execute-api.ap-south-1.amazonaws.com/prod/artifacts/",
  SMM_ENDPOINT: "https://uxqt3ihi80.execute-api.ap-south-1.amazonaws.com",
  QPULSE_ENPOINT: "https://kfsyohw9l4.execute-api.ap-south-1.amazonaws.com",
  TITO_ENDPOINT: "https://05w6t4otuh.execute-api.ap-south-1.amazonaws.com",
  TAG_CHECKIN: "https://05w6t4otuh.execute-api.ap-south-1.amazonaws.com",
  PROCHECK2_ENDPOINT: "https://p4ije25xz6.execute-api.ap-south-1.amazonaws.com",
  WORKFLOW2_ENDPOINT: "https://02z6icozm7.execute-api.ap-south-1.amazonaws.com",
  PRODIGI_ENDPOINT: "https://nod324kx8a.execute-api.ap-south-1.amazonaws.com",
  COGNITO_ENDPOINT:
    "https://msil-iot-platform-develop-new-2.auth.ap-south-1.amazoncognito.com",
  IDENTITY_ENDPOINT: "https://qczgq0f299.execute-api.ap-south-1.amazonaws.com",
  CLIENT_ID: "7q4k1oo7avdvvca0lp7irn5ego",
  CLIENT_SECRET: "bj19ip0a1sg0e8lgd0erhk1lmvi4qji95cnv6h60den4rrkr30u",
  IDENTITY_AUTHORIZER:
    "Basic N3E0azFvbzdhdmR2dmNhMGxwN2lybjVlZ286YmoxOWlwMGExc2cwZThsZ2QwZXJoazFsbXZpNHFqaTk1Y252Nmg2MGRlbjRycmtyMzB1",
  REDIRECT_URL: "https://dev.marutisuzukiiotspace.com/Login",
  AUGMAINT_ENDPOINT: "https://0rvjvewcb7.execute-api.ap-south-1.amazonaws.com",
  EM_ENDPOINT: "https://0rywrtcph7.execute-api.ap-south-1.amazonaws.com",
};

const QA_config = {
  Base_ENDPOINT: "https://8oasd6aw1k.execute-api.ap-south-1.amazonaws.com/QA/",
  BASE_ENDPOINT: "https://vj7k40wg0m.execute-api.ap-south-1.amazonaws.com/",
  Welding_ENDPOINT: "https://ot9coqko9f.execute-api.ap-south-1.amazonaws.com",
  PQC_ENDPOINT: "https://nja5jorgp1.execute-api.ap-south-1.amazonaws.com",
  USER_ENDPOINT: "https://m5d7n2vx05.execute-api.ap-south-1.amazonaws.com",
  CPQM_ENDPOINT: "https://uqpklzs98k.execute-api.ap-south-1.amazonaws.com",
  CLM_ENDPOINT: "https://5h0ziys9ed.execute-api.ap-south-1.amazonaws.com",
  SL_ENDPOINT: "https://uat.marutisuzukiiotspace.com",
  QPULSE_ENPOINT: "https://9t0pyp6azl.execute-api.ap-south-1.amazonaws.com",
  TITO_ENDPOINT: "https://oovqujwtpg.execute-api.ap-south-1.amazonaws.com",
  PRESS_ENDPOINT: "https://3ec0wxc4q2.execute-api.ap-south-1.amazonaws.com",
  WORKFLOW_ENDPOINT:
    "https://inc8tobrg1.execute-api.ap-south-1.amazonaws.com/approval/workflow/",
  WEBSOCKETS_ENDPOINT:
    "wss://akmcur8z29.execute-api.ap-south-1.amazonaws.com/production",
  Image_ENDPOINT:
    "https://62srm9w40g.execute-api.ap-south-1.amazonaws.com/prod/artifacts/",
  SMM_ENDPOINT: "https://5vgz6g5sq4.execute-api.ap-south-1.amazonaws.com",
  TAG_CHECKIN: "https://oovqujwtpg.execute-api.ap-south-1.amazonaws.com/",
  PROCHECK2_ENDPOINT: "https://fg4c45dwbc.execute-api.ap-south-1.amazonaws.com",
  WORKFLOW2_ENDPOINT: "https://0e6vangjw1.execute-api.ap-south-1.amazonaws.com",
  PRODIGI_ENDPOINT: "https://32xqid23j8.execute-api.ap-south-1.amazonaws.com",
  IDENTITY_ENDPOINT: "https://m5d7n2vx05.execute-api.ap-south-1.amazonaws.com",
  COGNITO_ENDPOINT:
    "https://msil-iot-platform-qa-new-1.auth.ap-south-1.amazoncognito.com",
  CLIENT_ID: "5du253jjpnnfdcuqbogtk0pfnb",
  CLIENT_SECRET: "157e6t862hqfi3usoa6v0knnl33jsqcgj64adt7bg4lnm61bqivc",
  IDENTITY_AUTHORIZER:
    "Basic NWR1MjUzampwbm5mZGN1cWJvZ3RrMHBmbmI6MTU3ZTZ0ODYyaHFmaTN1c29hNnYwa25ubDMzanNxY2dqNjRhZHQ3Ymc0bG5tNjFicWl2Yw==",
  REDIRECT_URL: "https://uat.marutisuzukiiotspace.com/Login",
  AUGMAINT_ENDPOINT: "https://a3f9eq66bg.execute-api.ap-south-1.amazonaws.com",
  EM_ENDPOINT: "https://o3mbwzzlvl.execute-api.ap-south-1.amazonaws.com",
};

let config = null;

if (
  process.env.REACT_APP_ENVIRONMENT === "UI_production" ||
  process.env.REACT_APP_ENVIRONMENT === "production"
) {
  config = prodConfig;
} else if (
  process.env.REACT_APP_ENVIRONMENT === "UI_develop" ||
  process.env.REACT_APP_ENVIRONMENT === "develop"
) {
  config = devConfig;
} else if (
  process.env.REACT_APP_ENVIRONMENT === "UI_QA" ||
  process.env.REACT_APP_ENVIRONMENT === "QA"
) {
  config = QA_config;
}
console.log("in config", process.env.REACT_APP_ENVIRONMENT);
export default config;
