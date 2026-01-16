/**
 * Check if a named slot has content
 * @param {import("lit").LitElement} host
 * @param {string} slotName
 * @returns {boolean}
 */
export function hasSlotContent(host, slotName) {
    /**
     * @type {HTMLSlotElement}
     */
    const slot = host.shadowRoot?.querySelector(`slot[name="${slotName}"]`);
    const assignedNodes = slot?.assignedNodes({ flatten: true }) || [];

    return assignedNodes.some((node) =>
        node.nodeType === Node.ELEMENT_NODE ||
        (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "")
    );
}
