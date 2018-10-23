/*
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const content = require('../deps/content.js');
const deps = require('./deps.js');
const filters = require('./filters.js');
const generators = require('./generators.js');
const validate = require('./validate.js');

module.exports = (callback) => {
  const loader = new content.ContentLoader(callback);
  loader.register('_auditpaths.md', generators.AuditGuidePaths);
  loader.register('path/*/_guidelist.md', generators.PathIndex);
  loader.register('./*.html', generators.HTMLBuilder);
  loader.register('./*.md', generators.MarkdownBuilder);

  // filter files which aren't relevant to DevSite
  loader.register('./*.yaml', filters.FilterYaml);

  // include dependent files in build
  loader.register('./*.{md,html}', deps.DevsiteIncludes);

  // validators for various common mistakes
  loader.register('./*.json', validate.testJSON);

  return loader;
};