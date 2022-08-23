pipeline {
    agent any
	tools {nodejs "NodeJs 16.17"}
	
  stages {
    stage('Checkout') {
      steps {
        // Get some code from a GitHub repository
        git branch: "main", url: 'https://github.com/All-About-Me/All-About-Me-Angular-Front-End.git'
      }
    }
        stage('Build') {
      steps {
			timeout(unit: 'MINUTES', time: 2) {
	  //make sure the nodeJS plugin is installed an configured with Jenkins
	  //commands for aws cli: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
	   
	    sh 'npm install -g @angular/cli'
	    sh 'npm install'
		sh 'ng test --no-watch --no-progress --browsers=ChromeHeadlessCI'
		sh 'ng build --configuration production --output-hashing none'
		
	   // in case the ng command goes back to not working, the following can be used instead
	   // sh 'npm run test -- --no-watch --no-progress --browsers=ChromeHeadlessCI'
       // sh 'npm run ng -- build'
      
	  }
	  }

          post {
        always {
          archiveArtifacts 'dist/'
        }
          }
        }
	stage ('S3 Upload') {
			steps {
			
			s3Upload consoleLogLevel: 'INFO', 
			dontSetBuildResultOnFailure: false, 
			dontWaitForConcurrentBuildCompletion: false, 
			entries: [[
				bucket: 'aamfront-enddeploy', excludedFile: '', flatten: true, 
				gzipFiles: false, keepForever: false, managedArtifacts: false, 
				noUploadOnFailure: true, selectedRegion: 'us-east-1', showDirectlyInBrowser: false, 
				sourceFile: 'dist/', storageClass: 'STANDARD', uploadFromSlave: false, useServerSideEncryption: false
				]],
			pluginFailureResultConstraint: 'FAILURE', 
			profileName: 'aamfront-enddeploy', 
			userMetadata: []
		
		}
         
  }
}
