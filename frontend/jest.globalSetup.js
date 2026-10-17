/**
 * Runs every test in a zone west of UTC. Content dates are Malaysian wall-clock
 * strings; code that reads them through device-zone Date getters passes by luck
 * in UTC+8 and fails here, which is the point.
 */
module.exports = () => {
  process.env.TZ = 'America/New_York';
};
