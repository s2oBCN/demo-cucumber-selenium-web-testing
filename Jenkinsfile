#!/usr/bin/env groovy

node('dockerserver')
{
    stage('Checkout')
    {
        step([$class: 'WsCleanup'])
        checkout scm
    }

    docker.image('frekele/gradle').inside
    {
        stage('Compile')
        {
            gradle "assemble"
        }
        stage("Test")
        {
            gradle "test"
        }
    }
}

void gradle(String tasks, String switches = null) {
    String gradleCommand = "";
    gradleCommand += 'gradle '
    gradleCommand += tasks

    if (switches != null) {
        gradleCommand += ' '
        gradleCommand += switches
    }

    sh gradleCommand.toString()
}