export class LoadResults {
    constructor(treeCache) {
        this.treeCache = treeCache;

        this.noteIdToSourceId = {};
        this.sourceIdToNoteIds = {};
        
        this.branches = [];

        this.attributes = [];

        this.noteReorderings = [];

        this.noteRevisions = [];
    }

    addNote(noteId, sourceId) {
        this.noteIdToSourceId[noteId] = this.noteIdToSourceId[noteId] || [];

        if (!this.noteIdToSourceId[noteId].includes(sourceId)) {
            this.noteIdToSourceId[noteId].push(sourceId);
        }

        this.sourceIdToNoteIds[sourceId] = this.sourceIdToNoteIds[sourceId] || [];

        if (!this.sourceIdToNoteIds[sourceId]) {
            this.sourceIdToNoteIds[sourceId].push(noteId);
        }
    }

    addBranch(branchId, sourceId) {
        this.branches.push({branchId, sourceId});
    }

    getBranches() {
        return this.branches
            .map(row => this.treeCache.branches[row.branchId])
            .filter(branch => !!branch);
    }

    addNoteReordering(parentNoteId, sourceId) {
        this.noteReorderings.push(parentNoteId);
    }

    getNoteReorderings() {
        return this.noteReorderings;
    }

    addAttribute(attributeId, sourceId) {
        this.attributes.push({attributeId, sourceId});
    }

    getAttributes() {
        return this.attributes
            .map(row => this.treeCache.attributes[row.attributeId])
            .filter(attr => !!attr);
    }

    addNoteRevision(noteRevisionId, noteId, sourceId) {
        this.noteRevisions.push({noteRevisionId, noteId, sourceId});
    }

    hasNoteRevisionForNote(noteId) {
        return !!this.noteRevisions.find(nr => nr.noteId === noteId);
    }

    getNoteIds() {
        return Object.keys(this.noteIdToSourceId);
    }

    isNoteReloaded(noteId, sourceId) {
        if (!noteId) {
            return false;
        }

        const sourceIds = this.noteIdToSourceId[noteId];
        return sourceIds && !!sourceIds.find(sId => sId !== sourceId);
    }
}