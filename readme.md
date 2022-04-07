# performance testing

we've been using vegeta for years, time to try something new too

## load testing

## spike testing

## soak testing

## k6

to run a sample script, execute [load-test.sh](./load-test.sh)

terms:

* vu
* vu code (default)
* init code (everything else)
* options
  * vus
  * duration
  * stages

reading:

* https://hub.docker.com/r/grafana/k6/
* https://k6.io/docs/getting-started/running-k6/
* https://k6.io/docs/getting-started/results-output/
* https://k6.io/docs/results-visualization/datadog/
* https://k6.io/docs/results-visualization/statsd/

To run the `docker-compose.yml` load test, execute: `docker-compose run --rm load-test run --out statsd - <script.js`.