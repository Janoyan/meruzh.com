module.exports = {
  apps: [{
    script: "http-server .",
    watch: true,
    watch_delay: 1000,
    ignore_watch : ["node_modules", "client/img", "\\.git", "*.log"],
  }]
}
