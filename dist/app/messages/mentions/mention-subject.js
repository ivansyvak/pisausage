"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MentionSubject {
    constructor() {
        this.index = 0;
        this.messages = [];
    }
    getMessage() {
        if (!this.messages.length) {
            return "Я хз что сказать";
        }
        if (this.index == this.messages.length) {
            this.index = 0;
        }
        return this.messages[this.index++];
    }
}
exports.MentionSubject = MentionSubject;
//# sourceMappingURL=mention-subject.js.map