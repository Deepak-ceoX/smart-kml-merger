import type {
  ParsedKML,
} from "@/types/kml";

export interface StudioPlugin {

  id: string;

  name: string;

  version: string;

  description?: string;

  onLoad?: () => void;

  onUnload?: () => void;

  beforeMerge?: (
    files: ParsedKML[]
  ) => Promise<ParsedKML[]> | ParsedKML[];

  afterMerge?: (
    data: ParsedKML
  ) => Promise<ParsedKML> | ParsedKML;

  beforeExport?: (
    data: ParsedKML
  ) => Promise<ParsedKML> | ParsedKML;

}

class PluginManager {

  private plugins =
    new Map<string, StudioPlugin>();

  register(
    plugin: StudioPlugin
  ) {

    if (
      this.plugins.has(plugin.id)
    ) {

      throw new Error(
        `Plugin "${plugin.id}" is already registered.`
      );

    }

    this.plugins.set(
      plugin.id,
      plugin
    );

    plugin.onLoad?.();

  }

  unregister(
    id: string
  ) {

    const plugin =
      this.plugins.get(id);

    if (!plugin) return;

    plugin.onUnload?.();

    this.plugins.delete(id);

  }

  list() {

    return Array.from(
      this.plugins.values()
    );

  }
    async runBeforeMerge(
    files: ParsedKML[]
  ) {

    let current = files;

    for (const plugin of this.plugins.values()) {

      if (plugin.beforeMerge) {

        current = await plugin.beforeMerge(current);

      }

    }

    return current;

  }

  async runAfterMerge(
    data: ParsedKML
  ) {

    let current = data;

    for (const plugin of this.plugins.values()) {

      if (plugin.afterMerge) {

        current = await plugin.afterMerge(current);

      }

    }

    return current;

  }

  async runBeforeExport(
    data: ParsedKML
  ) {

    let current = data;

    for (const plugin of this.plugins.values()) {

      if (plugin.beforeExport) {

        current = await plugin.beforeExport(current);

      }

    }

    return current;

  }

}

export const pluginManager =
  new PluginManager();