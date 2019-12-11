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
    }
}