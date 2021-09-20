export class ArgumentParser {
    private raw: string;
    private size: number;
    private position: number = 0;

    constructor(raw: string) {
        this.raw = raw;
        this.size = raw.length;
    }

    static parts(raw: string) {
        return new ArgumentParser(raw).parts();
    }

    static part(raw: string) {
        return new ArgumentParser(raw).part();
    }
    
    public rest() {
        return this.raw.substring(this.position);
    }

    public parts() {
        let buffer = new Array<string>();

        while(this.position < this.size) {
            if(/\s/.test(this.peek())) {
                this.next();
                continue;
            }

            const argument = this.part();
            if (!argument) break;
            buffer.push(argument);
        }

        return buffer;
    }

    public part() {
        let buffer = "";
        let current = this.peek(0);

        if(current == '"') {
            return this.bufferString();
        }

        while(this.position < this.size && !/\s/.test(current)) {
            buffer += current;
            current = this.next();
        }

        return buffer;
    }

    private bufferString() {
        let buffer = "";
        this.next();
        let current = this.peek();
        while(true) {
            if(current == '"') break;
            if(current == "\0") throw SyntaxError("Unterminated string literal. Expected symbol \"");
            buffer += current;
            current = this.next();
        }
        this.next();
        
        return buffer;
    }

    private next() {
        this.position++;
        return this.peek(0);
    }

    private peek(relativePosition: number = 0) {
        let position = this.position + relativePosition;
        if (position >= this.size) return '\0';
        return this.raw.charAt(position);
    }
}