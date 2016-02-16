This is a Shopify Theme that contains all the front-end code for a Shopify Store.

GETTING STARTED
1. In order to get started, you'll need a 'config.yml' file to be located within the root folder. The credentials in this file will correspond to a Shopify Development Store that should be set up prior to development. The file should look like this:

    ---
    :api_key: [API KEY]
    :password: [API PASSWORD]
    :store: [STORE URL]
  
2. In the Command Line, while in the 'deploy/' folder, run the following command:
  $ bundle
  
DEVELOPMENT FLOW
During development, there will be 1 task run at all times.
1. SHOPIFY: In the root folder, run the following command:
  $ theme watch
This will watch for any changes in your deploy/ folder and sync those changes to your Development Shopfy Store.


