# Admin Console 1.0 Test Plan: Health Check Worker

## Context

The following sequence diagram summarizes the interactions between systems. For
more detail, see the [Health Check
Worker](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-2.x/blob/main/docs/design/adminconsole/HEALTH-CHECK-WORKER.md)
design document.

```mermaid
sequenceDiagram
    participant Worker
    participant Keycloak
    participant AdminAPI
    participant ODS/API

    Worker ->> Keycloak: authenticate
    Worker ->> AdminAPI: GET instances

    loop Each Instance

        Worker ->> ODS/API: get Discovery

        loop Each endpoint
            Worker ->> ODS/API: get record count
        end

        Worker ->> AdminAPI: POST instance health
    end
```

## Functional Testing

### Static Analysis

The Alliance uses Sonar-dotnet, GitHub CodeQL, GitHub dependency-review-action,
GitHub Dependabot, and Trivy to automate static testing and detect
vulnerabilities in the source code and Docker images. All warnings are treated
as errors, ensuring thorough security analysis and compliance with the Ed-Fi C#
Coding Standard.

### Unit

The Health Check Worker will have unit tests covering all business logic.
As a .NET application, the test project will utilize the following tools:

* NUnit as the test framework.
* FakeItEasy for mocking.
* Shouldly for assertions.

Unit tests should not interact with Admin API or with the relational database
system.

These tests will run on every pull request in GitHub.

### Integration

This tool interacts with the Ed-Fi ODS/API to retrieve endpoint record counts.
It also interacts with Admin API for receiving information about what actions to
perform.

Integration testing, as opposed to the System testing listed below, would select
a module or class that interacts with one of these systems. It would establish a
live link to a running system or a test harness simulation, and then execute
that module with the live link. This would cover aspects of the source code that
are not practical to unit test.

Integration testing of this form will not be performed in the current project.

### System

System testing runs the entire application, not just a specific module,
with live links to real or simulated external services. In addition, System
testing can include execution of the application in failure scenarios to test
the error handling.

Automated system testing should be performed in the scope of the current
project, time permitting. This will require starting a running instance of Admin
API and orchestrating appropriate scenarios.

#### System Test Cases - Happy Path

1. Start environment in Docker using Compose.
2. Run SQL script to setup initial state for the test case.
3. Call `docker exec` to run the worker immediately, instead of waiting for
   schedule.
4. The instance is found and a new HealthCheck is created.
5. Obtain the HealthCheck and validate that it is formatted correctly and 
   contains the correct information.
6. Stop the docker environment.

For each test case, ensure that:

1. At least one instance has been created

#### System Test Cases - Negative

1. Admin API is inaccessible.
2. Keycloak is inaccessible.
3. Admin API credentials are invalid.
4. ODS/API is inaccessible.
5. ODS/API credentials are invalid.

For each test case, ensure that:

1. No instances are created in the application
2. Exit code from the application is not zero.

#### System Test Execution

One possible approach, using a PowerShell script or C# project:

1. Start environment in Docker using Compose.
2. Run SQL script to setup initial state for the test case.
3. Start a timer.
4. Call `docker exec` to run the worker immediately, instead of waiting for
   schedule. Don't use `--rm` to remove, as we need the logs
5. When it comes back:
   1. Stop the timer
   2. Collect logs and write to disk
   3. Report the duration taken.
   4. Remove the "exec" container.
6. Stop the docker environment.

If using PowerShell, can use Pester to write assertions. Ideally, these tests
would run on pull requests.

### System Integration

Complete system integration testing is covered in the [Admin
Console](./PLAN-console.md) test plan document.

## Non-Functional Testing

### Performance Testing

Using the System Test framework, add the following test cases. These can be run
automatically or manually. Favor automatic execution if the timing is very
quick.

#### Performance Test Cases

1. Average load: 5 instances.
   1. Assert that the duration is less than 1 minute.
2. Expected peak load: five instances.
   1. Assert that the duration is less than 10 minutes.

### Operational Useability Testing

Heuristics worksheet to be developed.

Performed by the support team rather than the development team, in coordination
with Ed-Fi Customer Success.

#### Operational Test Cases

1. Admin API is not running.
2. Unable to connect to destination database. The database server must be
   running for Admin API to work and provide information to the worker. Try
   running the worker from the container host OS or in an alternate Docker
   network, so that it can (a) access Admin API but (b) cannot access the RDBMS.
