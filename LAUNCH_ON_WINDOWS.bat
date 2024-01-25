
@echo off
REM =============
REM This script is meant for Guillaume R.
REM He should be able to just double-click it.
REM This should launch docker with the website
REM and automatically watch the YAML files
REM =============
REM 
REM this next line does a cd into the directory where the .bat script is located
cd /d "%~dp0"
docker-compose up --build
