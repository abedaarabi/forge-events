const { ModelDerivativeClient, ManifestHelper } = require("forge-server-utils");
const { SvfReader } = require("forge-convert-utils");
require("dotenv").config({ path: "../.env" });

const { FORGE_CLIENT_ID, FORGE_CLIENT_SECRET } = process.env;
export async function run(urn) {
  let array = [];
  const auth = {
    client_id: FORGE_CLIENT_ID,
    client_secret: FORGE_CLIENT_SECRET,
  };
  const modelDerivativeClient = new ModelDerivativeClient(auth);

  const manifestHelper = new ManifestHelper(
    await modelDerivativeClient.getManifest(urn)
  );

  const derivatives = manifestHelper.search({
    type: "resource",
    role: "graphics",
  });
  for (const derivative of derivatives.filter(
    (d) => d.mime === "application/autodesk-svf"
  )) {
    const reader = await SvfReader.FromDerivativeService(
      urn,
      derivative.guid,
      auth
    );

    for await (const fragment of reader.enumerateFragments()) {
      array.push(fragment);
    }
  }
  return array;
}

async function name(req, res) {
  const auth = await run(
    "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLlZ1b3hTMDhWUjJLN0JLOWtOd0x4c0E_dmVyc2lvbj0xMw"
  );
  res.status(200).json({ NextJsResponse: auth });
}
export default name;
