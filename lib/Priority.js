var sentiment = require("sentiment");
var Priority = {
    getPriority: function(subject) {
        var cleanSubject = subject.replace(/[^\w\s]/gi, '');
        var score = sentiment(cleanSubject);
        var priority = 1;
        switch(score.score) {
            case 1:
            case 2:
            case 3:
                priority = 2;  // Medium
                break;
            case (score.score > 3):
                priority = 1;  // Low
                break;
            case -1:
            case -2:
            case -3:
                priority = 3; // High
                break;
            case (score.score < -3):
                priority = 4; // Urgent
                break;
        }
        return priority;
    }
};
module.exports = Priority;
