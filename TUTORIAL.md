# Tutorial

This tutorial gives you a step-by-step guide how to set this project up and maintain or add new endpoints to the API

## Add a new endpoint to an existing version

- Navigate to the version you want to add the endpoint to. All version are located here: ``./src/version``
- Create a new function inside the endpoints file, to whom you want to add the endpoint, following this format: ``private <function name>(req: Request, rep: Reply) { /* Code goes here */ }`` and replace `<function name>` with the name of your new function
- Add your logic inside the braces (curly brackets)
- Inside the constructor add this line: ``this.instance.get(`${this.defaultStart}/<Path to custom endpoint>`, this.<function name>.bind(this));`` and:
  - replace `<Path to custom endpoint>` with the actual path for the new endpoint
  - replace ``<function name>`` with the name of the function you just created
- Your new endpoint is, after a restart, available under ``/api/<version number (e.g.: v1)>/<custom endpoint, specified inside the endpoint file>/<new path>``

## Add a completely new section to an existing version

- Navigate to the version you want to add the endpoint to. All version are located here: ``./src/version``
- Create a new file inside the version folder
- Paste the content from [this file](https://github.com/Xander1233/automatic-api-version-manager/blob/master/examples/NewVersionEndpoint.ts) inside it
- Change the content of ``this.defaultStart`` to whatever endpoint you want. We recommend you to only change the last part of the path
- Open the ``api.ts`` file from the current version
- Create a new section by writing ``private <section name>: <section class>;`` between the start of the class and the constructor
- Inside the constructor write: ``this.<section name> = new <section class>(version, app);``
- Add new endpoints to the section by following this tutorial: https://github.com/Xander1233/automatic-api-version-manager/blob/master/TUTORIAL.md#add-a-new-endpoint-to-an-existing-version

## Add a new version

- Navigate to the versions folder located here: ``./src/version``
- Create a new folder following this format: ``v<version number (Any integer number)>``
- Create a file called ``api.ts`` inside the newly created folder
- Paste the content from [this file](https://github.com/Xander1233/automatic-api-version-manager/blob/master/examples/NewVersionIndexFile.ts) inside it
- Restart the service and you are good to go
- Visit the new version with this path: ``/api/v<version number>`` (You probably have to add some endpoints in order to actually connect to the endpoint)
