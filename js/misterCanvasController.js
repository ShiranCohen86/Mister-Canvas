'use strict'

var gElCanvas;
var gCtx;
var gCurrShape;
var gFillColor = "#ff0000";
var gStrokeColor = "#ff0000"
var gCurrTxt;
var gDotsCounts = 1;
var gStartLine = {};


function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gStrokeColor
    gCtx.fillStyle = gFillColor
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawTriangle(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.moveTo(x, y - 50)
    gCtx.lineTo(x - 50, y + 50)
    gCtx.lineTo(x + 50, y + 50)
    gCtx.closePath()
    gCtx.fillStyle = gFillColor
    gCtx.fill()
    gCtx.strokeStyle = gStrokeColor
    gCtx.stroke()
}

function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.rect(x - 25, y - 25, 50, 50)
    gCtx.fillStyle = gFillColor
    gCtx.fillRect(x - 25, y - 25, 50, 50)
    gCtx.strokeStyle = gStrokeColor
    gCtx.stroke()
}

function drawLine(x, y, xEnd, yEnd) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.moveTo(x, y)
    gCtx.lineTo(xEnd, yEnd)
    gCtx.strokeStyle = gFillColor
    gCtx.stroke()

}
function setShape(shape, txt) {
    gCurrShape = shape
    gDotsCounts = 1
    if (txt) {
        gCurrTxt = txt;
    }
}

function draw(ev) {
    const { offsetX, offsetY } = ev
    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break;
        case 'rect':
            drawRect(offsetX, offsetY)
            break;
        case 'text':
            drawText(gCurrTxt, offsetX, offsetY)
            break;
        case 'line':
            if (gDotsCounts > 1) {
                drawLine(offsetX, offsetY, gStartLine.offsetX, gStartLine.offsetY)
            }
            gStartLine.offsetX = offsetX;
            gStartLine.offsetY = offsetY;
            gDotsCounts++;
            break;
    }
}

function setFillColor(color) {
    gFillColor = color;
}
function setStrokeColor(color) {
    gStrokeColor = color;
}

function onTxt(txt, ev) {
    const { offsetX, offsetY } = ev
    gCurrTxt = txt;
}
function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

}
function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'puki'
}