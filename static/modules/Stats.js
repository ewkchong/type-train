
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

    getWpmArray() {
        const wpmArray = [];
        while(this.getTimeArray(this.startTime)) {
            wpmArray.push(this.calculateResult(this.getTimeArray(this.startTime)));
        }
        return wpmArray;
    }

    // chart = lineChart(this.getTimeArray {
    //     x: d => d.
    // })

    // Copyright 2021 Observable, Inc.
    // Released under the ISC license.
    // https://observablehq.com/@d3/histogram
    lineChart(data, {
        x = ([x]) => x, // given d in data, returns the (temporal) x-value
        y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
        defined, // for gaps in data
        curve = d3.curveLinear, // method of interpolation between points
        marginTop = 20, // top margin, in pixels
        marginRight = 30, // right margin, in pixels
        marginBottom = 30, // bottom margin, in pixels
        marginLeft = 40, // left margin, in pixels
        width = 640, // outer width, in pixels
        height = 400, // outer height, in pixels
        xType = d3.scaleUtc, // the x-scale type
        xDomain, // [xmin, xmax]
        xRange = [marginLeft, width - marginRight], // [left, right]
        yType = d3.scaleLinear, // the y-scale type
        yDomain, // [ymin, ymax]
        yRange = [height - marginBottom, marginTop], // [bottom, top]
        yFormat, // a format specifier string for the y-axis
        yLabel = "Words Per Minute", // a label for the y-axis
        color = "black", // stroke color of line
        strokeLinecap = "round", // stroke line cap of the line
        strokeLinejoin = "round", // stroke line join of the line
        strokeWidth = 1.5, // stroke width of line, in pixels
        strokeOpacity = 1, // stroke opacity of line
    } = {}) {
        // Compute values.
        const X = d3.map(data, x);
        const Y = d3.map(data, y);
        const I = d3.range(X.length);
        if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
        const D = d3.map(data, defined);

        // Compute default domains.
        if (xDomain === undefined) xDomain = d3.extent(X);
        if (yDomain === undefined) yDomain = [0, d3.max(Y)];

        // Construct scales and axes.
        const xScale = xType(xDomain, xRange);
        const yScale = yType(yDomain, yRange);
        const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

        // Construct a line generator.
        const line = d3.line()
            .defined(i => D[i])
            .curve(curve)
            .x(i => xScale(X[i]))
            .y(i => yScale(Y[i]));

        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(xAxis);

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
                .text(yLabel));

        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", strokeWidth)
            .attr("stroke-linecap", strokeLinecap)
            .attr("stroke-linejoin", strokeLinejoin)
            .attr("stroke-opacity", strokeOpacity)
            .attr("d", line(I));

        return svg.node();
    }
    
    setUpGraph() {
        document.getElementById('graph').appendChild(this.lineChart(this.getTimeArray()));
    }

    clearGraph() {
        if (document.querySelector('svg')) {
            document.querySelector('svg').remove();
        }
    }

    
}