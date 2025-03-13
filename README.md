# Custom Email Timeline Control 📧

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)

## Overview

Custom Email Timeline Control is a PowerApps Component Framework (PCF) control that provides a customized timeline view for emails within a model-driven app.

## Features

- 📬 Customizable email timeline view
- 📅 Easy integration with model-driven apps
- 🔧 Configurable settings for display

## Installation

To install the Custom Email Timeline Control, follow these steps:

1. Clone the repository:

    ```powershell
    git clone https://github.com/matteo-campana/CustomEmailTimelineControl.git
    ```

2. Navigate to the project directory:

    ```powershell
    cd CustomEmailTimelineControl
    ```

3. Install dependencies:

    ```powershell
    npm install
    ```

4. Build the project:

    ```powershell
    npm run build -- --buildMode production
    ```

5. Start the project in watch mode (optional):

    ```powershell
    npm run start:watch
    ```

## Building and Deploying to Dataverse

To create and import a solution file:

1. Create a new folder inside the sample component folder and name it as `Solutions` (or any name of your choice):

    ```powershell
    mkdir Solutions
    cd Solutions
    ```

2. Create a new solutions project:

    ```powershell
    pac solution init --publisher-name developer --publisher-prefix dev
    ```

    > Note: The `publisher-name` and `publisher-prefix` values must be unique to your environment.

3. Add a reference to the sample component:

    ```powershell
    pac solution add-reference --path c:\downloads\mysamplecomponent
    ```

4. Generate a zip file from the solution project:

    ```powershell
    msbuild /t:restore
    msbuild
    ```

    Or if you have installed the .NET SDK, version >= 6:

    ```powershell
    dotnet build
    ```

    > Tip: If `msbuild 15.9.*` is not in the path, open Developer Command Prompt for VS 2017 to run the `msbuild` commands.

5. The generated solution files are located inside the `\bin\debug\` folder after the build is successful.

6. Manually import the solution into Dataverse using the web portal or automatically using the Microsoft Power Platform Build Tools.

### Connecting to your environment

1. Create your authentication profile:

    ```powershell
    pac auth create --url https://xyz.crm.dynamics.com
    ```

2. View all existing profiles:

    ```powershell
    pac auth list
    ```

3. Switch between profiles:

    ```powershell
    pac auth select --index <index of the active profile>
    ```

### Deploying code components

1. Ensure that you have a valid authentication profile created.
2. Navigate to the directory where the sample component file is located.
3. Push the code components to the Dataverse instance:

    ```powershell
    pac pcf push --publisher-prefix <your publisher prefix>
    ```

    > Note: The publisher prefix that you use with the push command should match the publisher prefix of your solution in which the components will be included.

## Input Parameters

The Custom Email Timeline Control accepts the following input parameters:

- `DebugMode`: A boolean option to enable or disable debug mode.
- `CollectCurrentRecordEmails`: A boolean option to collect emails related to the current record.
- `CollectParentEmails`: A boolean option to collect emails related to the parent record.
- `CollectAncestorEmails`: A boolean option to collect emails related to ancestor records.

## Scripts

The following scripts are available:

- `build`: Builds the project using `pcf-scripts build`.
- `clean`: Cleans the project using `pcf-scripts clean`.
- `lint`: Lints the project using `pcf-scripts lint`.
- `lint:fix`: Fixes linting issues using `pcf-scripts lint fix`.
- `rebuild`: Rebuilds the project using `pcf-scripts rebuild`.
- `start`: Starts the project using `pcf-scripts start`.
- `start:watch`: Starts the project in watch mode using `pcf-scripts start watch`.

## Dependencies

The project has the following dependencies:

- `react`: 16.14.0
- `@fluentui/react-components`: 9.46.2
- `react-dom`: 16.14.0

## Usage

To use the Custom Email Timeline Control in your model-driven app, follow these steps:

1. Import the solution into your environment.
2. Add the control to the desired form.
3. Configure the control settings as needed.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## ⭐️ Show your support

Give a ⭐️ if this project helped you!

## 📬 Stay in touch

- Author: Matteo Campana
- GitHub: [matteo-campana](https://github.com/matteo-campana)
