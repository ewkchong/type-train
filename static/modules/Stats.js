export default class Stats {
    constructor(startTime) {
        this.keystrokes = [];
        this.excluded = [];
        this.startTime = startTime;
        this.endTime = Date.now();
    }

    pushKeystroke(time, letter, correct) {
        const stroke = {
            time: time,
            letter: letter,
            correct: correct,
        };
        this.keystrokes.push(stroke);
    }

    excludeKeystroke() {
        this.excluded.push(this.keystrokes.pop());
    }

    setStartTime(time) {
        this.startTime = time; 
    }

    reset() {
        this.keystrokes = [];
        this.excluded = [];
        this.startTime = Date.now();
    }

    calculateResult(endTime) {
        this.endTime = endTime;
        const duration = (endTime - this.startTime) / 1000;
        const typedLetters = this.keystrokes.length;
        const excludedLetters = this.excluded.length;
        const totalLetters = typedLetters + excludedLetters;
        const uncorrectedErrors = this.keystrokes.filter((k) => k.correct == false).length;
        const excludedErrors = this.excluded.filter((k) => k.correct == false).length;
        
        const wordsPerMinute = (((typedLetters - uncorrectedErrors) / 5) * 60) / duration;

        const accuracy = ((totalLetters - uncorrectedErrors - excludedErrors) / totalLetters) * 100;

        console.log(`WPM: ${wordsPerMinute}wpm`);
        console.log(`accuracy: ${accuracy}%`);
        console.log(`typed letters: ${typedLetters}, uncorrectedErrors: ${uncorrectedErrors}, totalLetters: ${totalLetters}`)
        console.log(this.keystrokes);
        console.log(this.excluded);
    
        return [wordsPerMinute, accuracy];
    }

    getTimeArray() {
        return this.keystrokes.map((key) => {
            key.time -= this.startTime;
            return Math.round(key.time / 1000);
        })
    }

    // Copyright 2021 Observable, Inc.
    // Released under the ISC license.
    // https://observablehq.com/@d3/histogram
    Histogram(data, {
        value = d => d, // convenience alias for x
        domain, // convenience alias for xDomain
        label, // convenience alias for xLabel
        format, // convenience alias for xFormat
        type = d3.scaleLinear, // convenience alias for xType
        x = value, // given d in data, returns the (quantitative) x-value
        y = () => 1, // given d in data, returns the (quantitative) weight
        thresholds = Math.round((this.endTime - this.startTime) / 1000), // approximate number of bins to generate, or threshold function
        marginTop = 20, // top margin, in pixels
        marginRight = 30, // right margin, in pixels
        marginBottom = 30, // bottom margin, in pixels
        marginLeft = 40, // left margin, in pixels
        width = 640, // outer width of chart, in pixels
        height = 200, // outer height of chart, in pixels
        insetLeft = 0.5, // inset left edge of bar
        insetRight = 0.5, // inset right edge of bar
        xType = type, // type of x-scale
        xDomain = domain, // [xmin, xmax]
        xRange = [marginLeft, width - marginRight], // [left, right]
        xLabel = "→ Time (s)", // a label for the x-axis
        xFormat = format, // a format specifier string for the x-axis
        yType = d3.scaleLinear, // type of y-scale
        yDomain, // [ymin, ymax]
        yRange = [height - marginBottom, marginTop], // [bottom, top]
        yLabel = "↑ Keys", // a label for the y-axis
        yFormat, // a format specifier string for the y-axis
        color = "currentColor" // bar fill color
        } = {}) {
        // Compute values.
        const X = d3.map(data, x);
        const Y = d3.map(data, y);
        const I = d3.range(X.length);

        // Compute bins.
        const bins = d3.bin().thresholds(thresholds).value(i => X[i])(I);

        // Compute default domains.
        if (xDomain === undefined) xDomain = [bins[0].x0, bins[bins.length - 1].x1];
        if (yDomain === undefined) yDomain = [0, d3.max(bins, I => d3.sum(I, i => Y[i]))];

        // Construct scales and axes.
        const xScale = xType(xDomain, xRange);
        const yScale = yType(yDomain, yRange);
        const xAxis = d3.axisBottom(xScale).ticks(width / 80, xFormat).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);
        yFormat = yScale.tickFormat(100, yFormat);

        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(yAxis)
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width - marginLeft - marginRight)
                .attr("stroke-opacity", 0.1))
            .call(g => g.append("text")
                .attr("x", -marginLeft)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .attr("font-size", "0.9rem")
                .attr("font-family", "Source Code Pro")
                .text(yLabel));

        svg.append("g")
            .attr("fill", color)
            .selectAll("rect")
            .data(bins)
            .join("rect")
            .attr("x", d => xScale(d.x0) + insetLeft)
            .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - insetLeft - insetLeft))
            .attr("y", d => yScale(d3.sum(d, i => Y[i])))
            .attr("height", d => yScale(0) - yScale(d3.sum(d, i => Y[i])))
            .append("title")
            .text((d, i) => [`${d.x0} ≤ x < ${d.x1}`, yFormat(d3.sum(d, i => Y[i]))].join("\n"));

        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(xAxis)
            .call(g => g.append("text")
                .attr("x", width - marginRight)
                .attr("y", 27)
                .attr("fill", "currentColor")
                .attr("text-anchor", "end")
                .attr("font-size", "0.78rem")
                .attr("font-family", "Source Code Pro")
                .text(xLabel));

                return svg.node();
    }

    setUpGraph() {
        document.getElementById('graph').appendChild(this.Histogram(this.getTimeArray()));
    }

    clearGraph() {
        if (document.querySelector('svg')) {
            document.querySelector('svg').remove();
        }
    }
}