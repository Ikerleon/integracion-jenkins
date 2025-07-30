pipeline {
    agent any

    tools {
        nodejs "node24"         // Asegúrate de tener esta versión definida en Jenkins
        dockerTool "dockertools" // También debe estar configurado
    }

    environment {
        IMAGE_NAME = "tienda-payphone"
        CONTAINER_NAME = "tienda-payphone"
        PORT = "3007"
    }

    stages {

        stage('Instalación de dependencias') {
            steps {
                sh 'npm install'
            }
        }

        stage('Ejecución de tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Construir Imagen Docker') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                sh "docker build -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Ejecutar contenedor Docker') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p ${PORT}:${PORT} ${IMAGE_NAME}:latest
                """
            }
        }
    }

    post {
        success {
            echo "✅ Despliegue completo: http://localhost:${PORT}"
        }
        failure {
            echo "❌ Error en el pipeline"
        }
    }
}
