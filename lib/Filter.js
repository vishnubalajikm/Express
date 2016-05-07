var nlp = require("nlp_compromise");
var Priority = require("./Priority");

var categories = [
    { 
        name: "Account",
        categories:["Any","None","URL Change","Company Name Change","Plan Change","Data Export","Data Import","Plans and Billing","Deletion","Trial Extension","Others","Login Related Issues","Blocked Manually"]
    },
    {
        name: "Tickets",
        categories:["Any","None","Incidents","Task","List View","Details Page","Others","Search"]
    },
    {
        name: "Helpdesk",
        categories:[ "Any","None","Departments / Companies","Requests / Contacts","CAB","Service Catalog","Time Zone","Ticket Fields", "Field Templates", "Multiple Products", "Multi Language", "Groups", "Tags", "Agents", "Roles", "Day Pass", "Round Robin", "Search","Others", "Browser Issues", "Rebranding"]
    },
    {
        name: "Performance Issues",
        categories: ["Any","None","Latency Issues","Automations","Email Issues","Twilio","Chat","AWS Issues", "Export Delay", "App Down", "Scheduled Maintenance"]
    },
    {
        name: "Application Error",
        categories: ["Any","None","504 Errors","Portal Inaccessible","Something Went Wrong","IP Blocks","Agent Blocks"]
    },
    {
        name: "Security",
        categories:["Any","None","SSO","SAML","Custom SSL","SSL","IP Whitelisting","Domain whitelisting","Backup","Others"]
    },
    {
        name: "Dashboard",
        categories:["Any","None","Announcement","LeaderBoard","Task","To Do","Others","Custom Dashboard","Recent Activities","Ticket Summary"]
    },
    {
        name: "Phone",
        categories:["Any","None","Request","Setup","Issues","Feature","Porting","Mobile App","Others"]
    },
    {
        name: "Chat",
        categories:[]
    },
    {
        name: "Social",
        categories:["Any","None","Twitter","Facebook"]
    },
    {
        name: "Forums",
        categories:[]
    },
    {
        name: "Solutions",
        categories:[]
    },
    {
        name: "Portal Customization",
        categories:["Any","None","CSS","CName","Others","Freshtheme"]
    },
    {
        name: "Email",
        categories:["Any","None","Setup","Compose Email","Custom Mailbox","Attachments","Notification","Sendgrid","Delay","Incoming","Others","Emoji"]
    },
];
var Filter = {
    getCategory: function(key) {
        var re = new RegExp(key,"gi");
        var cat = categories.filter(function(category) { return category.name.match(re); });
        //category =  { name:"helpdesk", categories:[] };
        return cat.length > 0 ? cat[0] : { name: "Helpdesk",categories: [] };
    },
    getSubCategory: function(key, category) {
        var re = new RegExp(key,"gi");
        var subCategory = "";
        if(category.categories.length > 0) {

            subCategory = category.categories.filter(function(subCategory) { return subCategory.match(re); });
        }
        return subCategory.length > 0 ? subCategory[0] : "";
    },
    filter: function(subject) {
        // Getting Priority
        var _priority = Priority.getPriority(subject);
        // Getting terms
        var terms = nlp.text(subject).terms();
        // filtering nouns 
        var Nouns = terms.filter(function(term) {
            return term.tag === "Noun" || term.tag === "Infinitive" || term.tag === "Adjective";
        });
        var _category = "";
        var _subCategory = "";
        var _this = this;
        // getting Category
        Nouns.every(function(item) {
            var cleanItem = nlp.noun(item.normal).singularize();

            // split words if they have space character
            cleanItem.split(" ").forEach(function(item) {
                _category = _this.getCategory(item);
            });
            if(_category.name !== "Helpdesk") {
                return false; // break the every iteration
            } else return true;
        });

        // Search terms in ticket description and try to find out category
        //
        // Find Sub category
        Nouns.every(function(item) {
            // split words if they have space character
            item.normal.split(" ").forEach(function(item) {
                _subCategory = _this.getSubCategory(item,_category);
            });
            if(_subCategory !== "") {
                return false; // break the every iteration
            } else return true;
        });
        var ticket = {
            category: _category.name,
            sub_category: _subCategory,
            priority: _priority
        };
        return ticket;
            
    },

};

module.exports = Filter;
