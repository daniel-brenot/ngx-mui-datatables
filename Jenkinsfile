pipeline {
    agent any

    stages {
        stage('Build project') {
            steps {
                ansiColor('xterm'){
                    sh 'yarn build'
                }
            }
        }
        stage('Test') {
            steps {
                ansiColor('xterm'){
                    sh 'yarn test'
                }
            }
        }
        stage('Code Coverage') {
            steps {
                ansiColor('xterm'){
                    withCredentials([string(credentialsId: 'ngx-mui-datatables-coveralls', variable: 'COVERALLS_REPO_TOKEN')]) {
                        sh 'set +x'
                        sh 'yarn coverage'
                    }
                }
            }
        }
    }
}