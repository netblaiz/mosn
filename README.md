
## MOSN BACKEND API

  

  

<details  open="open">

:scroll: **Table of Contents**</summary>


<ul>

<li><a  href="#about">About</a></li>

<li>
<a  href="#installation">Installation</a>
</li>

<li><a  href="#technologies-used">Stack Used</a></li>

</ul>

</li>


<li><a  href="#contact">Contact</a></li>

</ol>

</details>

  

  

---

  

  



  
### ABOUT

An API/Service developed to manage MOSN Hospitality Cloud. The API contains endpoints for managing properties, inventories and travel itineraries.
  

### INSTALLATION

#### Use this option only if you want to play around with the code on your local machine

  

1. Clone this repository and open your terminal/command line app in the root folder

2. Install dependencies

  

```npm install ```

4. Delete docker-compose.yaml file and rename docker-compose-for-mongo-only.yml to docker-compose.yaml

5. (Optional) You can customize the default database and app credentials in both .env and docker-compose.yaml files, ensure values in both files are thesame

6. Run the command below to start mongo container with the required credentials

  

```docker compose up --build ```

4. Run tests using the command below

```npm run test```

7. Run the command below to start server (app will run on default port 4000)

```npm run dev```

---

  

  
  

### Technologies Used

  

  

The following are the major tools that have been utilized for developing and deploying this service.

  

*  [Typescript](https://www.typescriptlang.org)

  

*  [Nodejs](https://nodejs.org/en/)

  

*  [Express](https://expressjs.com)

  

*  [Jest](https://jestjs.io/)

  

*  [Supertest](https://www.npmjs.com/package/supertest)

  

*  [Docker](https://docker.com/)

  

*  [Jenkins](https://www.jenkins.io/)
* [Helm ](https://helm.sh/)
* [Kubernetes/AWS EKS](https://aws.amazon.com/eks/)

  <!-- CONTACT -->

## Contact

  

Atilola Oyediji 
Email: atilola.oyediji@gmail.com
LinkedIn: Atilola Oyediji
 Twitter: (https://twitter.com/atilolaoyediji)  

  

:scroll: **END**