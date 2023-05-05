import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 5,
    handler: function (req , res ) {
        const currentTime = Date.now();
        const remainingTime = req.rateLimit.resetTime - currentTime;
        const retrySeconds = Math.ceil(remainingTime / 1000);
        const retryMinutes = Math.floor(retrySeconds / 60);
        const remainingSeconds = retrySeconds % 60;
        let message = `Too many request from this IP. Please try again after ${retryMinutes} minutes and ${remainingSeconds} seconds`;
        res.status(429).json({message});
    },
});