import react from "@vitejs/plugin-react";
import license from "rollup-plugin-license";
import { join } from "path";

/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    license({
      thirdParty: {
        output: {
          file: join(__dirname, "installer_resources", "license.txt"),
          template: (dependencies) =>
            dependencies
              .map(
                (dependency) =>
                  `-----
${dependency.name ?? "unknown"} ${dependency.version ?? "unknown"} (${dependency.license ?? "unknown"})

${dependency.licenseText ?? `(no license text included — see ${dependency.license ?? "package"} license)`}
`,
              )
              .join("\n"),
        },
        allow: {
          failOnUnlicensed: true,
          failOnViolation: true,
          test: "(MIT OR ISC)",
        },
      },
    }),
  ],
};
