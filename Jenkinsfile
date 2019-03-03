#!/usr/bin/env groovy

node('master')
{
    stage('Checkout')
    {
        step([$class: 'WsCleanup'])
        checkout scm
    }

    stage('Compile')
    {
        gradle "assemble"
    }

    stage("Test")
    {
        //def hostname ="172.17.0.3"
        //currentBuild.rawBuild.project.setDescription("<iframe src='http://${hostname}:4444/grid/admin/live' width='1400' height='500'></iframe>")
        gradle "test"

    }

    stage("Publish")
    {
        //currentBuild.rawBuild.project.setDescription("")

        junit testResults: "target/site/serenity/SERENITY-JUNIT-*.xml", allowEmptyResults: true

        gradle "aggregate"
        publishHTML(target: [
                reportName           : "Serenity",
                reportDir            : "target/site/serenity",
                reportFiles          : 'index.html',
                keepAll              : true,
                alwaysLinkToLastBuild: true,
                allowMissing         : true
        ])
    }
}

void gradle(String tasks, String switches = null) {
    String gradleCommand = "";
    gradleCommand += './gradlew '
    gradleCommand += tasks

    if (switches != null) {
        gradleCommand += ' '
        gradleCommand += switches
    }

    sh script:gradleCommand.toString(), returnStatus: true
}