const generateEmailTemplate = (actionLink) => `
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirmation de l'adresse Mail</title>
  </head>

  <body
    style="
      font-family: Arial, sans-serif;
      font-size: 16px;
      background-color: #ffffff;
      margin: 8px;
      padding: 0;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fafafa;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      "
    >
      <div style="text-align: center; margin-bottom: 10px">
        <img
          style="max-width: 100px; height: auto"
          src="https://firebasestorage.googleapis.com/v0/b/esogbea-7f186.appspot.com/o/esogbea%2Flogo%2Flogo_white_theme.png?alt=media&token=fca41bd2-3afb-491b-b286-0c9f1a3d03e2"
          alt="Esogbea Logo"
        />
      </div>
      <div style="text-align: justify">
        <p>Bonjour,</p>
        <p>
          Merci de vous être inscrit à notre service. Pour finaliser votre
          inscription, veuillez cliquer sur le bouton ci-dessous pour confirmer
          votre adresse e-mail:
        </p>
        <a
          href="${actionLink}"
          style="
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            margin-top: 10px;
          "
          >confirmer</a
        >
        <p style="color: red; font-weight: bold">
          Le lien expirera dans 1 heure
        </p>
        <p>
          Si vous n'avez pas demandé cette inscription, vous pouvez ignorer cet
          e-mail en toute sécurité.
        </p>
        <p>Cordialement,<br />Votre Team Esogbea</p>
      </div>
      <div
        style="
          margin-top: 40px;
          text-align: center;
          font-size: 12px;
          color: #666666;
        "
      >
        Ceci est un e-mail automatisé. Veuillez ne pas répondre.
      </div>
    </div>
  </body>
</html>
`;

module.exports = generateEmailTemplate;
