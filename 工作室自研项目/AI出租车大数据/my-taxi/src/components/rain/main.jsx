import React, { useEffect } from "react";
export default function Rain() {
    useEffect(() => {
        const rain = [];
        const drops = [];
        const gravity = 0.2;
        const wind = 0.015;
        const rain_chance = 0.4;
        window.requestAnimFrame =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        const canvas = document.getElementById("c");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        //--------------------------------------------
        class Vector {
            constructor(x = 0, y = 0) {
                this.x = x;
                this.y = y;
            }
            add(v) {
                if (v.x != null && v.y != null) {
                    this.x += v.x;
                    this.y += v.y;
                } else {
                    this.x += v;
                    this.y += v;
                }
                return this;
            }
            copy() {
                return new Vector(this.x, this.y);
            }
        }
        //--------------------------------------------
        class Rain {
            constructor() {
                this.pos = new Vector(Math.random() * canvas.width, -50);
                this.prev = this.pos;
                this.vel = new Vector();
            }
            update() {
                this.prev = this.pos.copy();
                this.vel.y += gravity;
                this.vel.x += wind;
                this.pos.add(this.vel);
            }
            draw(ctx) {
                ctx.beginPath();
                ctx.moveTo(this.pos.x, this.pos.y);
                ctx.lineTo(this.prev.x, this.prev.y);
                ctx.stroke();
            }
        }
        //--------------------------------------------
        class Drop {
            constructor(x, y) {
                const dist = Math.random() * 7;
                const angle = Math.PI + Math.random() * Math.PI;
                this.pos = new Vector(x, y);
                this.vel = new Vector(
                    Math.cos(angle) * dist,
                    Math.sin(angle) * dist
                );
            }
            update() {
                this.vel.y += gravity;
                this.vel.x *= 0.95;
                this.vel.y *= 0.95;
                this.pos.add(this.vel);
            }
            draw(ctx) {
                ctx.beginPath();
                ctx.arc(this.pos.x, this.pos.y, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        //--------------------------------------------
        function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let i = rain.length;
            while (i--) {
                const raindrop = rain[i];
                raindrop.update();
                if (raindrop.pos.y >= canvas.height) {
                    let n = Math.round(4 + Math.random() * 4);
                    while (n--)
                        drops.push(new Drop(raindrop.pos.x, canvas.height));
                    rain.splice(i, 1);
                }
                raindrop.draw(ctx);
            }
            i = drops.length;
            while (i--) {
                const drop = drops[i];
                drop.update();
                drop.draw(ctx);
                if (drop.pos.y > canvas.height) drops.splice(i, 1);
            }
            if (Math.random() < rain_chance) rain.push(new Rain());
            requestAnimFrame(update);
        }

        function init() {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "rgba(60,135,235,1)";
            ctx.fillStyle = "rgba(60,135,235,1)";
            update();
        }
        init();
    }, []);

    return (
        <>
            <canvas
                id="c"
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    zIndex: "9999",
                    pointerEvents: "none",
                }}
            ></canvas>
        </>
    );
}
