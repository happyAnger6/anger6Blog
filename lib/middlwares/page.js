module.exports = function(perpage) {
    perpage = perpage || 10;
    return function(req, res, next) {
        var page = Math.max(
            parseInt(req.query.page || '1', 10),
            1
        ) - 1;

        var from = page * perpage;
        var to = page * perpage + perpage;

        totals = req.totals;
        if (totals.length < from) {
            return res.json([]);
        }

        if ( totals.length < to) {
            to = totals.length;
        }

        console.log("totals", req.totals.length, from, to);
        res.json(totals.slice(from, to));
    }
};