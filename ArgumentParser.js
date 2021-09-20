"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentParser = void 0;
class ArgumentParser {
    raw;
    size;
    position = 0;
    constructor(raw) {
        this.raw = raw;
        this.size = raw.length;
    }
    static parts(raw) {
        return new ArgumentParser(raw).parts();
    }
    static part(raw) {
        return new ArgumentParser(raw).part();
    }
    rest() {
        return this.raw.substring(this.position);
    }
    parts() {
        let buffer = new Array();
        while (this.position < this.size) {
            if (/\s/.test(this.peek())) {
                this.next();
                continue;
            }
            const argument = this.part();
            if (!argument)
                break;
            buffer.push(argument);
        }
        return buffer;
    }
    part() {
        let buffer = "";
        let current = this.peek(0);
        if (current == '"') {
            return this.bufferString();
        }
        while (this.position < this.size && !/\s/.test(current)) {
            buffer += current;
            current = this.next();
        }
        return buffer;
    }
    bufferString() {
        let buffer = "";
        this.next();
        let current = this.peek();
        while (true) {
            if (current == '"')
                break;
            if (current == "\0")
                throw SyntaxError("Unterminated string literal. Expected symbol \"");
            buffer += current;
            current = this.next();
        }
        this.next();
        return buffer;
    }
    next() {
        this.position++;
        return this.peek(0);
    }
    peek(relativePosition = 0) {
        let position = this.position + relativePosition;
        if (position >= this.size)
            return '\0';
        return this.raw.charAt(position);
    }
}
exports.ArgumentParser = ArgumentParser;
