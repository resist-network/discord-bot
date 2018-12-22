node {
   //def mvnHome
   stage('Preparation') { // for display purposes
      // Get some code from a GitHub repository
      git 'https://github.com/nodedirt/nodedirt-disco.git'
      // Get the Maven tool.
      // ** NOTE: This 'M3' Maven tool must be configured
      // **       in the global configuration.           
      //mvnHome = tool 'M2'
   }
   stage('Build') {
      // Run the maven build
      //if (isUnix()) {
         //sh "mvn -Dmaven.test.failure.ignore --quiet clean package"
      //} else {
         //bat(/"${mvnHome}\bin\mvn" -Dmaven.test.failure.ignore clean package/)
      //}
   }
   stage('Results') {
	//sh "rm target/original*"
	//sh "sudo cp target/NodeDirt.jar /storage/minecraft/plugins/."
	//sh "sudo systemctl restart nodedirt-minecraft"
	sh 'tar cvvf release.tar.gz --exclude=config.json *'
	archive '*.tar.gz'
    //always {
      //discordSend description: 'Jenkins Pipeline Build', footer: '©2017 NodeDirt.com', link: BUILD_URL, successful: currentBuild.resultIsBetterOrEqualTo('SUCCESS'), title: JOB_NAME, webhookURL: 'https://discordapp.com/api/webhooks/404542228011286529/jo2WWSvX5-8qHAA8-pYJfoNx3T_dgY9v3mwgq1RPId8AFbAnE4Wwz8Fkwoh9i0yHUEDc'
    //}
   }
}
