pipeline {
    agent any

    tools {
        nodejs 'NodeJS18'
    }

    environment {
        IMAGE_NAME     = 'my-cicd-app'
        IMAGE_TAG      = "v${BUILD_NUMBER}"
        CONTAINER_NAME = 'my-cicd-container'
        PORT           = '3000'
    }

    stages {

        stage('📥 Checkout') {
            steps {
                echo '=== Checking out source code ==='
                checkout scm
            }
        }

        stage('📦 Install Dependencies') {
            steps {
                echo '=== Installing npm packages ==='
                sh 'npm install'
            }
        }

        stage('🧪 Test') {
            steps {
                echo '=== Running Tests ==='
                sh 'npm test'
            }
            post {
                failure {
                    echo '❌ Tests failed! Pipeline stopped.'
                }
            }
        }

        stage('🐳 Build Docker Image') {
            steps {
                echo "=== Building Docker image: ${IMAGE_NAME}:${IMAGE_TAG} ==="
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest"
            }
        }

        stage('🚀 Deploy Container') {
            steps {
                echo '=== Deploying container ==='
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm   ${CONTAINER_NAME} || true
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${PORT}:3000 \
                        --restart unless-stopped \
                        ${IMAGE_NAME}:latest
                """
                echo "✅ App deployed at http://localhost:${PORT}"
            }
        }

        stage('🔍 Verify Deployment') {
            steps {
                echo '=== Verifying container is running ==='
                sh "docker ps | grep ${CONTAINER_NAME}"
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline SUCCEEDED! App is live.'
        }
        failure {
            echo '💥 Pipeline FAILED. Check logs above.'
        }
        always {
            echo '🧹 Cleaning up old Docker images...'
            sh "docker image prune -f || true"
        }
    }
}