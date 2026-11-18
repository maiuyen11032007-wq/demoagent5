/**
 * AzurePulse AI · UI Controller & Multi-Dimensional Decision BI Layer
 */

const appState = {
  currentScene: 0,
  stagedRows: null,
  stagedName: '',
  stagedSampleId: null,
  businessContext: null,
  cleaningNote: '',
  reportApproved: false,
  humanReportComment: '',
  analysis: null,
  charts: {
    trend: null,
    pareto: null,
    breakdown: null,
    dual: null
  },
  history: JSON.parse(localStorage.getItem('azurepulse_history') || '[]')
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  renderSampleCards();
  setupDropzone();
  validateReadiness();
});

function renderSampleCards() {
  const grid = document.getElementById('sampleCardsGrid');
  if (!grid) return;
  const icons = {
    retail_sales: 'fa-cart-shopping',
    marketing_funnel: 'fa-bullhorn',
    hr_kpi: 'fa-users-gear'
  };
  grid.innerHTML = Object.values(SAMPLE_DATASETS).map(ds => `
    <div class="glass-card rounded-2xl p-5 flex flex-col justify-between gap-4">
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-extrabold text-blue-700">${ds.category}</span>
          <span class="text-[11px] font-bold text-slate-400">${ds.rows.length} dòng</span>
        </div>
        <h3 class="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <i class="fa-solid ${icons[ds.id] || 'fa-table'} text-blue-600"></i>
          <span>${ds.name}</span>
        </h3>
        <p class="text-xs text-slate-500 leading-relaxed">${ds.description}</p>
      </div>
      <button type="button" onclick="prepareSampleInScene1('${ds.id}')" class="btn-outline-azure w-full text-xs">
        <i class="fa-solid fa-arrow-right text-blue-600"></i>
        <span>Nạp vào Bối cảnh &amp; Dữ liệu</span>
      </button>
    </div>
  `).join('');
}

// ==================== SCENE NAVIGATION ====================
function goToScene(index) {
  if (index === 3 && !appState.analysis) {
    goToScene(1);
    return;
  }
  appState.currentScene = index;
  document.querySelectorAll('.app-scene').forEach((el, idx) => {
    el.classList.toggle('scene-active', idx === index);
  });
  document.querySelectorAll('[data-scene-btn]').forEach(btn => {
    const target = Number(btn.getAttribute('data-scene-btn'));
    btn.classList.toggle('is-active', target === index);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== MANDATORY CONTEXT + DATA VALIDATION ====================
function onContextSelectChange(type) {
  if (type === 'industry') {
    const sel = document.getElementById('ctxIndustry');
    const custom = document.getElementById('ctxIndustryCustom');
    custom.classList.toggle('hidden', sel.value !== '__other__');
    if (sel.value === '__other__') custom.focus();
  } else if (type === 'objective') {
    const sel = document.getElementById('ctxObjective');
    const custom = document.getElementById('ctxObjectiveCustom');
    custom.classList.toggle('hidden', sel.value !== '__other__');
    if (sel.value === '__other__') custom.focus();
  }
  validateReadiness();
}

function getBusinessContext() {
  const indSel = document.getElementById('ctxIndustry')?.value || '';
  const indCustom = (document.getElementById('ctxIndustryCustom')?.value || '').trim();
  const objSel = document.getElementById('ctxObjective')?.value || '';
  const objCustom = (document.getElementById('ctxObjectiveCustom')?.value || '').trim();

  return {
    companyName: (document.getElementById('ctxCompanyName')?.value || '').trim(),
    industry: indSel === '__other__' ? indCustom : indSel.trim(),
    objective: objSel === '__other__' ? objCustom : objSel.trim(),
    question: (document.getElementById('ctxQuestion')?.value || '').trim()
  };
}

function validateReadiness() {
  const ctx = getBusinessContext();
  const hasContext = Boolean(ctx.companyName && ctx.industry && ctx.objective && ctx.question);
  const hasData = Boolean(appState.stagedRows && appState.stagedRows.length > 0);

  const ctxBadge = document.getElementById('checkCtxBadge');
  const dataBadge = document.getElementById('checkDataBadge');
  const btnRun = document.getElementById('btnRunAgent');
  const hint = document.getElementById('readinessHint');

  if (ctxBadge) {
    ctxBadge.className = hasContext
      ? 'px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold'
      : 'px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-bold';
    ctxBadge.innerHTML = hasContext
      ? '<i class="fa-solid fa-circle-check mr-1"></i> Bối cảnh: Đã sẵn sàng'
      : '<i class="fa-regular fa-circle mr-1"></i> Bối cảnh: Bắt buộc điền';
  }

  if (dataBadge) {
    dataBadge.className = hasData
      ? 'px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold'
      : 'px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-bold';
    dataBadge.innerHTML = hasData
      ? `<i class="fa-solid fa-circle-check mr-1"></i> Dữ liệu: ${appState.stagedRows.length} dòng`
      : '<i class="fa-regular fa-circle mr-1"></i> Dữ liệu: Bắt buộc nạp';
  }

  const ready = hasContext && hasData;
  if (btnRun) btnRun.disabled = !ready;

  if (hint) {
    if (ready) {
      hint.className = 'text-xs font-bold text-emerald-700';
      hint.innerHTML = '<i class="fa-solid fa-check-double mr-1"></i> Đã đủ Bối cảnh &amp; Dữ liệu! Sẵn sàng chạy AI Agent.';
    } else if (!hasContext && !hasData) {
      hint.className = 'text-xs font-semibold text-amber-700';
      hint.innerHTML = '<i class="fa-solid fa-circle-info mr-1"></i> Vui lòng điền đủ Bối cảnh Doanh nghiệp (A) và tải File Dữ liệu (B).';
    } else if (!hasContext) {
      hint.className = 'text-xs font-semibold text-amber-700';
      hint.innerHTML = '<i class="fa-solid fa-circle-info mr-1"></i> Đã có dữ liệu! Hãy điền đầy đủ Bối cảnh Doanh nghiệp (phần A) để tiếp tục.';
    } else {
      hint.className = 'text-xs font-semibold text-amber-700';
      hint.innerHTML = '<i class="fa-solid fa-circle-info mr-1"></i> Đã có bối cảnh! Hãy tải file Excel/CSV hoặc nạp dữ liệu (phần B).';
    }
  }
}

function fillSampleContext() {
  const sampleId = appState.stagedSampleId || 'retail_sales';
  const def = SAMPLE_DATASETS[sampleId]?.defaultContext || SAMPLE_DATASETS.retail_sales.defaultContext;
  document.getElementById('ctxCompanyName').value = def.companyName;
  document.getElementById('ctxIndustry').value = def.industry;
  document.getElementById('ctxIndustryCustom').classList.add('hidden');
  document.getElementById('ctxObjective').value = def.objective;
  document.getElementById('ctxObjectiveCustom').classList.add('hidden');
  document.getElementById('ctxQuestion').value = def.question;
  validateReadiness();
}

function prepareSampleInScene1(sampleId) {
  goToScene(1);
  loadSampleIntoPreview(sampleId);
}

// ==================== FILE UPLOAD & INGESTION ====================
function setupDropzone() {
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  if (!dropZone || !fileInput) return;

  dropZone.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('is-dragover');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('is-dragover'));
  dropZone.addEventListener('drop', async (e) => {
    e.preventDefault();
    dropZone.classList.remove('is-dragover');
    const file = e.dataTransfer?.files?.[0];
    if (file) await handleFile(file);
  });
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (file) await handleFile(file);
    fileInput.value = '';
  });
}

async function handleFile(file) {
  hideIngestError();
  try {
    const rows = await parseUploadedFile(file);
    appState.stagedSampleId = null;
    stageDataset(rows, file.name);
  } catch (err) {
    showIngestError(err.message || 'Không thể đọc file này.');
  }
}

function parsePastedText() {
  hideIngestError();
  const raw = document.getElementById('pasteDataInput')?.value || '';
  try {
    const rows = parseDelimitedText(raw);
    appState.stagedSampleId = null;
    stageDataset(rows, 'Dữ liệu dán trực tiếp');
  } catch (err) {
    showIngestError(err.message || 'Không thể phân tích nội dung đã dán.');
  }
}

function loadSampleIntoPreview(sampleId) {
  const ds = SAMPLE_DATASETS[sampleId];
  if (!ds) return;
  hideIngestError();
  appState.stagedSampleId = sampleId;
  stageDataset(ds.rows, ds.name);
}

function showIngestError(msg) {
  const box = document.getElementById('ingestErrorBox');
  if (!box) return;
  box.textContent = msg;
  box.classList.remove('hidden');
}

function hideIngestError() {
  document.getElementById('ingestErrorBox')?.classList.add('hidden');
}

function stageDataset(rows, name) {
  appState.stagedRows = rows;
  appState.stagedName = name;

  const badge = document.getElementById('previewBadge');
  const content = document.getElementById('previewContent');
  const chips = document.getElementById('previewColsChips');
  const table = document.getElementById('previewTable');

  const cols = Object.keys(rows[0] || {});
  badge.textContent = `${rows.length} dòng · ${cols.length} cột`;
  content.classList.remove('hidden');

  chips.innerHTML = cols.map(c => `
    <span class="px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-[11px] font-bold text-blue-800">${escapeHtml(c)}</span>
  `).join('');

  const headHtml = `<thead class="bg-blue-50 text-blue-900"><tr>${cols.map(c => `<th class="px-3 py-2 font-extrabold border-b border-blue-100 whitespace-nowrap">${escapeHtml(c)}</th>`).join('')}</tr></thead>`;
  const bodyRows = rows.slice(0, 4).map(r => `
    <tr class="hover:bg-blue-50/40 border-b border-blue-50">
      ${cols.map(c => `<td class="px-3 py-1.5 text-slate-700 whitespace-nowrap">${escapeHtml(r[c] ?? '')}</td>`).join('')}
    </tr>
  `).join('');
  table.innerHTML = headHtml + `<tbody>${bodyRows}</tbody>`;

  validateReadiness();
}

// ==================== AI PIPELINE EXECUTION (2-PHASE WITH HUMAN REVIEW) ====================
async function startAgentPipeline() {
  const ctx = getBusinessContext();
  if (!ctx.companyName || !ctx.industry || !ctx.objective || !ctx.question || !appState.stagedRows?.length) {
    validateReadiness();
    return;
  }
  appState.businessContext = ctx;
  goToScene(2);

  const reviewGate = document.getElementById('humanReviewGate');
  reviewGate.classList.add('hidden');
  document.getElementById('humanAnalysisGate')?.classList.add('hidden');
  document.getElementById('analysisRevisionFeedback')?.classList.add('hidden');
  if (document.getElementById('humanAnalysisComment')) document.getElementById('humanAnalysisComment').value = '';

  const steps = [
    { label: `Đọc bối cảnh "${ctx.companyName}" & kiểm tra cấu trúc ${appState.stagedRows.length} dòng`, log: `Context loaded: ${ctx.industry} | Goal: ${ctx.objective}` },
    { label: 'Agent tự động làm sạch sơ bộ (Missing, Trùng lặp, Khoảng trắng) & chuẩn bị kiểm duyệt', log: 'Running automated data cleaning & preparing human-in-the-loop review...' },
    { label: 'Phân tích tập trung Pareto 80/20 & hiệu suất kép theo nhóm', log: 'Computing group margins, concentration share, and dual-metric efficiency...' },
    { label: 'Dựng 4 biểu đồ BI đa chiều & phân tích sâu Dashboard', log: 'Generating 4 interactive BI charts & deep dashboard synthesis...' },
    { label: 'Tổng hợp Ma trận Quyết định & giải đáp câu hỏi Nhà quản trị', log: `Answering executive query: "${ctx.question.slice(0, 60)}..."` }
  ];

  const listEl = document.getElementById('pipelineStepsList');
  const consoleEl = document.getElementById('pipelineConsole');
  const barEl = document.getElementById('pipelineProgressBar');
  const subEl = document.getElementById('pipelineSub');
  const headlineEl = document.getElementById('pipelineHeadline');

  headlineEl.textContent = 'Giai đoạn 1 · Agent đang làm sạch & kiểm tra dữ liệu...';
  consoleEl.innerHTML = `<div>&gt; [AzurePulse] Target: "${escapeHtml(appState.stagedName)}" for "${escapeHtml(ctx.companyName)}"</div>`;
  listEl.innerHTML = steps.map((s, idx) => `
    <div id="pipeStep-${idx}" class="flex items-center justify-between p-3 rounded-xl border border-blue-100 bg-white/70 text-xs transition-all">
      <div class="flex items-center gap-2.5">
        <span id="pipeIcon-${idx}" class="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[11px] font-bold">${idx + 1}</span>
        <span class="font-bold text-slate-700">${s.label}</span>
      </div>
      <span id="pipeStatus-${idx}" class="text-[11px] font-bold text-slate-400">${idx === 2 ? 'Chờ duyệt' : 'Chờ...'}</span>
    </div>
  `).join('');

  // Run Steps 1 & 2 (Cleaning Phase)
  for (let i = 0; i < 2; i++) {
    await runPipelineStepUI(i, steps, subEl, barEl, consoleEl, 5);
  }

  // Prepare cleaned data & pause at Human Review Gate
  const cleanRes = cleanDataset(appState.stagedRows);
  appState.pendingClean = cleanRes;
  const rawProfile = analyzeDataset(appState.stagedRows, appState.stagedName, ctx);

  headlineEl.textContent = 'Tạm dừng · Chờ Con người Kiểm duyệt Dữ liệu';
  subEl.textContent = 'Hãy kiểm tra các thay đổi làm sạch bên dưới và bấm Phê duyệt để bắt đầu phân tích.';
  consoleEl.innerHTML += `<div>&gt; [HITL-Gate] Cleaning complete: ${cleanRes.report.filledMissing} missing filled, ${cleanRes.report.removedDuplicates} duplicates removed. Waiting for human approval...</div>`;
  consoleEl.scrollTop = consoleEl.scrollHeight;

  document.getElementById('reviewCleanSummary').innerHTML = `
    <div class="p-2.5 rounded-xl bg-white border border-blue-200"><div class="text-[10px] text-slate-500 font-bold">Ô thiếu đã điền</div><div class="text-base font-extrabold text-blue-700">${cleanRes.report.filledMissing}</div></div>
    <div class="p-2.5 rounded-xl bg-white border border-blue-200"><div class="text-[10px] text-slate-500 font-bold">Dòng trùng đã xóa</div><div class="text-base font-extrabold text-sky-700">${cleanRes.report.removedDuplicates}</div></div>
    <div class="p-2.5 rounded-xl bg-white border border-blue-200"><div class="text-[10px] text-slate-500 font-bold">Chuỗi chuẩn hóa</div><div class="text-base font-extrabold text-indigo-700">${cleanRes.report.trimmedStrings}</div></div>
    <div class="p-2.5 rounded-xl bg-white border border-blue-200"><div class="text-[10px] text-slate-500 font-bold">Ngoại lai phát hiện</div><div class="text-base font-extrabold text-amber-600">${rawProfile.anomalyRecords.length}</div></div>
  `;

  renderReviewPreviewTable();
  reviewGate.classList.remove('hidden');
}

function renderReviewPreviewTable() {
  const choice = document.querySelector('input[name="reviewDataChoice"]:checked')?.value || 'cleaned';
  const rows = choice === 'cleaned' ? appState.pendingClean?.cleanedRows : appState.stagedRows;
  const table = document.getElementById('reviewCleanedTable');
  if (!rows?.length || !table) return;
  const cols = Object.keys(rows[0]);
  const head = `<thead class="bg-blue-50 text-blue-900 sticky top-0"><tr>${cols.map(c => `<th class="px-3 py-2 font-extrabold whitespace-nowrap">${escapeHtml(c)}</th>`).join('')}</tr></thead>`;
  const body = rows.slice(0, 8).map(r => `
    <tr class="border-t border-blue-50 hover:bg-blue-50/40">
      ${cols.map(c => `<td class="px-3 py-1.5 text-slate-700 whitespace-nowrap">${escapeHtml(r[c] ?? '')}</td>`).join('')}
    </tr>
  `).join('');
  table.innerHTML = head + `<tbody>${body}</tbody>`;
}

async function applyHumanCleanEdit() {
  const input = document.getElementById('humanCleanInstructions');
  const feedback = document.getElementById('humanCleanFeedback');
  const instruction = (input?.value || '').trim();
  if (!instruction) {
    feedback.textContent = 'Vui lòng nhập yêu cầu sửa hoặc ghi chú trước khi áp dụng.';
    feedback.className = 'text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5';
    feedback.classList.remove('hidden');
    return;
  }

  feedback.textContent = '⏳ Đang xử lý yêu cầu chỉnh sửa dữ liệu...';
  feedback.className = 'text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1.5';
  feedback.classList.remove('hidden');

  const choice = document.querySelector('input[name="reviewDataChoice"]:checked')?.value || 'cleaned';
  const baseRows = choice === 'cleaned' ? appState.pendingClean.cleanedRows : appState.stagedRows;
  const { rows, appliedNotes, matched } = await applyHumanCleaningInstructionsAsync(baseRows, instruction);

  if (!matched) {
    feedback.innerHTML = `⚠️ Chưa hiểu hoặc không tìm thấy dữ liệu khớp cho "<strong>${escapeHtml(instruction)}</strong>". Hỗ trợ: đổi tên cột, thêm cột tính toán (<code>thêm cột Loi_Nhuan = Sales_VND - Cost_VND</code>), lọc số (<code>xóa Sales_VND &lt; 1000000</code>), tăng/giảm %, làm tròn, sắp xếp, viết hoa/thường, xóa trùng, xóa dòng/cột, thay giá trị.`;
    feedback.className = 'text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5';
    feedback.classList.remove('hidden');
    return;
  }

  if (choice === 'cleaned') appState.pendingClean.cleanedRows = rows;
  else appState.stagedRows = rows;

  appState.cleaningNote = instruction;
  renderReviewPreviewTable();

  feedback.textContent = `✅ ${appliedNotes.join(' ')}`;
  feedback.className = 'text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1.5';
  feedback.classList.remove('hidden');

  const consoleEl = document.getElementById('pipelineConsole');
  if (consoleEl) {
    consoleEl.innerHTML += `<div>&gt; [Human-Edit] ${escapeHtml(appliedNotes.join(' '))}</div>`;
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }
}

async function approveCleaningAndAnalyze() {
  const choice = document.querySelector('input[name="reviewDataChoice"]:checked')?.value || 'cleaned';
  let chosenRows = choice === 'cleaned' ? appState.pendingClean.cleanedRows : appState.stagedRows;
  const pendingInstruction = (document.getElementById('humanCleanInstructions')?.value || '').trim();
  if (pendingInstruction && !appState.cleaningNote) {
    const res = await applyHumanCleaningInstructionsAsync(chosenRows, pendingInstruction);
    chosenRows = res.rows;
    appState.cleaningNote = pendingInstruction;
  }
  appState.stagedRows = chosenRows;

  document.getElementById('humanReviewGate').classList.add('hidden');
  document.getElementById('pipelineHeadline').textContent = 'Giai đoạn 2 · Agent đang phân tích sâu & dựng Dashboard...';

  const consoleEl = document.getElementById('pipelineConsole');
  const barEl = document.getElementById('pipelineProgressBar');
  const subEl = document.getElementById('pipelineSub');
  const ctx = appState.businessContext;

  consoleEl.innerHTML += `<div>&gt; [HITL-Approved] Using ${choice === 'cleaned' ? 'CLEANED' : 'RAW'} dataset (${chosenRows.length} rows). Resuming deep analysis...</div>`;

  const steps = [
    null,
    null,
    { label: 'Phân tích tập trung Pareto 80/20 & hiệu suất kép theo nhóm', log: 'Computing group margins, concentration share, and dual-metric efficiency...' },
    { label: 'Dựng 4 biểu đồ BI đa chiều & phân tích sâu Dashboard', log: 'Generating 4 interactive BI charts & deep dashboard synthesis...' },
    { label: 'Tổng hợp Ma trận Quyết định & giải đáp câu hỏi Nhà quản trị', log: `Answering executive query: "${ctx.question.slice(0, 60)}..."` }
  ];

  for (let i = 2; i < 5; i++) {
    await runPipelineStepUI(i, steps, subEl, barEl, consoleEl, 5);
  }

  appState.analysis = analyzeDataset(chosenRows, appState.stagedName, ctx);
  showAnalysisApprovalGate();
}

function showAnalysisApprovalGate() {
  const a = appState.analysis;
  const er = a?.executiveReport;
  if (!a || !er) return;

  document.getElementById('pipelineHeadline').textContent = 'Tạm dừng · Chờ Phê duyệt Kết quả Phân tích trước khi Tạo Báo cáo';
  document.getElementById('pipelineSub').textContent = 'Xem trước các phát hiện chính. Bạn có thể yêu cầu chỉnh sửa lại phân tích theo nhận xét hoặc phê duyệt để tạo Dashboard & Báo cáo.';

  const previewBox = document.getElementById('analysisReviewPreview');
  const changesBadge = (a.revisionApplied && a.revisionApplied.length)
    ? `<div class="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold mb-2"><i class="fa-solid fa-sliders mr-1"></i> Thay đổi đã áp dụng lên Dashboard &amp; Báo cáo: ${escapeHtml(a.revisionApplied.join(' · '))}</div>`
    : `<div class="p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-800 font-bold mb-2">Cấu hình hiện tại: ${a.totalRows} dòng · Chỉ số chính (Y1): ${escapeHtml(a.primaryMetric?.name || '—')} · Phân nhóm (X): ${escapeHtml(a.groupDim?.name || '—')}</div>`;

  previewBox.innerHTML = changesBadge + er.directAnswer
    .split('\n')
    .map(line => `<p>${escapeHtml(line).replace(/\*\*(.+?)\*\*/g, '<strong class="text-slate-900">$1</strong>')}</p>`)
    .join('');

  const consoleEl = document.getElementById('pipelineConsole');
  if (consoleEl) {
    consoleEl.innerHTML += `<div>&gt; [HITL-Gate 2] Preliminary analysis ready. Waiting for human approval or revision before generating Dashboard &amp; Report...</div>`;
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  document.getElementById('humanAnalysisGate').classList.remove('hidden');
}

async function reviseAnalysisWithComment() {
  const comment = (document.getElementById('humanAnalysisComment')?.value || '').trim();
  const feedback = document.getElementById('analysisRevisionFeedback');
  if (!comment) {
    feedback.textContent = 'Vui lòng nhập nhận xét hoặc yêu cầu chỉnh sửa để Agent phân tích lại.';
    feedback.className = 'text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5';
    feedback.classList.remove('hidden');
    document.getElementById('humanAnalysisComment')?.focus();
    return;
  }

  appState.businessContext.analysisRevisionNote = comment;
  const consoleEl = document.getElementById('pipelineConsole');
  const barEl = document.getElementById('pipelineProgressBar');
  const subEl = document.getElementById('pipelineSub');

  document.getElementById('pipelineHeadline').textContent = 'Đang chỉnh sửa lại phân tích theo nhận xét của bạn...';
  const reviseSteps = [
    null,
    null,
    null,
    { label: `Hiệu chỉnh góc nhìn phân tích theo nhận xét: "${comment.slice(0, 45)}..."`, log: `Re-evaluating metrics & segments with human directive: "${comment}"` },
    { label: 'Cập nhật lại kết luận & đề xuất sơ bộ để kiểm duyệt', log: 'Updated preliminary findings and decision priorities.' }
  ];

  for (let i = 3; i < 5; i++) {
    await runPipelineStepUI(i, reviseSteps, subEl, barEl, consoleEl, 5);
  }

  appState.analysis = analyzeDataset(appState.stagedRows, appState.stagedName, appState.businessContext);
  showAnalysisApprovalGate();

  const appliedList = appState.analysis.revisionApplied || [];
  if (appliedList.length) {
    feedback.innerHTML = `✅ <strong>Đã chỉnh sửa ngay cấu trúc phân tích &amp; Dashboard:</strong> ${escapeHtml(appliedList.join(' | '))}`;
    feedback.className = 'text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1.5';
  } else {
    feedback.innerHTML = `⚠️ Chưa tìm thấy cột hoặc giá trị khớp với "<strong>${escapeHtml(comment)}</strong>" để lọc/đổi trục. Thử ghi rõ tên cột hoặc giá trị (VD: <code>xóa CC-ORD-103727</code>, <code>chỉ Miền Bắc</code>, <code>phân tích theo City</code>, <code>xóa cột Customer_ID</code>).`;
    feedback.className = 'text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5';
  }
  feedback.classList.remove('hidden');
}

function approveAnalysisAndBuildReport() {
  const comment = (document.getElementById('humanAnalysisComment')?.value || '').trim();
  if (comment) {
    appState.businessContext.analysisRevisionNote = comment;
    appState.analysis = analyzeDataset(appState.stagedRows, appState.stagedName, appState.businessContext);
  }

  saveToHistory(appState.analysis);
  renderWorkspace();
  goToScene(3);
}

async function runPipelineStepUI(i, steps, subEl, barEl, consoleEl, total) {
  const stepRow = document.getElementById(`pipeStep-${i}`);
  const icon = document.getElementById(`pipeIcon-${i}`);
  const status = document.getElementById(`pipeStatus-${i}`);

  stepRow.classList.add('border-blue-400', 'bg-blue-50/70');
  icon.className = 'w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px]';
  icon.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  status.textContent = 'Đang chạy...';
  status.className = 'text-[11px] font-bold text-blue-600';
  subEl.textContent = steps[i].label;
  barEl.style.width = `${Math.round(((i + 0.5) / total) * 100)}%`;

  consoleEl.innerHTML += `<div>&gt; [Step ${i + 1}/${total}] ${escapeHtml(steps[i].log)}</div>`;
  consoleEl.scrollTop = consoleEl.scrollHeight;

  await new Promise(r => setTimeout(r, 300));

  icon.className = 'w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px]';
  icon.innerHTML = '<i class="fa-solid fa-check"></i>';
  status.textContent = 'Hoàn tất';
  status.className = 'text-[11px] font-bold text-emerald-600';
  stepRow.classList.remove('border-blue-400', 'bg-blue-50/70');
  barEl.style.width = `${Math.round(((i + 1) / total) * 100)}%`;
}

// ==================== WORKSPACE RENDERING ====================
function renderWorkspace() {
  const a = appState.analysis;
  if (!a) return;
  const ctx = a.businessContext || {};

  document.getElementById('wsDatasetTitle').textContent = `${ctx.companyName || 'Doanh nghiệp'} · ${a.datasetName}`;
  document.getElementById('wsDatasetMeta').textContent = `${a.totalRows.toLocaleString('vi-VN')} dòng · ${a.totalCols} cột · Lĩnh vực: ${ctx.industry || '—'}`;

  const healthBadge = document.getElementById('wsHealthBadge');
  healthBadge.textContent = `Health Score: ${a.healthScore}/100`;
  healthBadge.className = a.healthScore >= 90
    ? 'px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800'
    : 'px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800';

  document.getElementById('wsContextStrip').innerHTML = `
    <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
      <span><strong class="text-blue-900">Mục tiêu:</strong> ${escapeHtml(ctx.objective || '—')}</span>
      <span><strong class="text-blue-900">Lĩnh vực:</strong> ${escapeHtml(ctx.industry || '—')}</span>
    </div>
    <div class="text-slate-600"><strong class="text-blue-900">Bài toán quản trị:</strong> "${escapeHtml(ctx.question || '—')}"</div>
  `;

  // Alert Chips
  document.getElementById('wsAlertChips').innerHTML = a.alerts.map(al => {
    const cls = al.level === 'success'
      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
      : (al.level === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-blue-50 border-blue-200 text-blue-800');
    const ic = al.level === 'success' ? 'fa-circle-check' : (al.level === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info');
    return `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${cls}"><i class="fa-solid ${ic}"></i> ${escapeHtml(al.text)}</span>`;
  }).join('');

  // 4 KPI Cards
  const pm = a.primaryMetric;
  const sm = a.secondaryMetric;
  const netMargin = (pm && sm && pm.sum > 0) ? (((pm.sum - sm.sum) / pm.sum) * 100).toFixed(1) + '%' : '—';

  const kpis = [
    {
      label: pm ? `Tổng ${pm.name}` : 'Tổng bản ghi',
      value: pm ? formatNumberVN(pm.sum, true) : `${a.totalRows}`,
      sub: pm ? `TB/dòng: ${formatNumberVN(pm.mean, true)}` : `${a.totalCols} cột`,
      icon: 'fa-chart-line',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      label: sm ? `Đối chiếu ${sm.name}` : 'Độ tập trung Top nhóm',
      value: sm ? formatNumberVN(sm.sum, true) : `${a.topNShare.toFixed(1)}%`,
      sub: sm ? `Chênh lệch biên: ${netMargin}` : 'Tỷ trọng Pareto nhóm đầu',
      icon: 'fa-scale-balanced',
      color: 'text-sky-600 bg-sky-50'
    },
    {
      label: 'Tập trung Pareto',
      value: `${a.topNShare.toFixed(1)}%`,
      sub: `Nhóm dẫn đầu: ${a.categoryBreakdown[0]?.label || '—'}`,
      icon: 'fa-chart-pie',
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      label: 'Sức khỏe & Rủi ro',
      value: `${a.healthScore}/100`,
      sub: `${a.totalMissingCells} ô thiếu · ${a.anomalyRecords.length} ngoại lai`,
      icon: 'fa-shield-halved',
      color: a.healthScore >= 90 ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
    }
  ];

  document.getElementById('wsKpiGrid').innerHTML = kpis.map(k => `
    <div class="glass-card rounded-2xl p-4 flex items-start justify-between gap-3">
      <div class="space-y-1">
        <p class="text-[11px] font-bold text-slate-500 uppercase tracking-wide">${escapeHtml(k.label)}</p>
        <p class="text-xl font-extrabold text-slate-900">${escapeHtml(k.value)}</p>
        <p class="text-[11px] font-semibold text-slate-500">${escapeHtml(k.sub)}</p>
      </div>
      <div class="w-10 h-10 rounded-xl ${k.color} flex items-center justify-center text-base shrink-0">
        <i class="fa-solid ${k.icon}"></i>
      </div>
    </div>
  `).join('');

  // Populate Chart Selectors
  const metricSel = document.getElementById('selectMetricCol');
  const secSel = document.getElementById('selectSecondaryCol');
  const groupSel = document.getElementById('selectGroupCol');

  metricSel.innerHTML = a.numericCols.map(c => `<option value="${escapeHtml(c.name)}">${escapeHtml(c.name)}</option>`).join('') || '<option value="">Không có</option>';
  secSel.innerHTML = '<option value="">-- Không đối chiếu --</option>' + a.numericCols.map(c => `<option value="${escapeHtml(c.name)}">${escapeHtml(c.name)}</option>`).join('');
  groupSel.innerHTML = a.categoryCols.map(c => `<option value="${escapeHtml(c.name)}">${escapeHtml(c.name)}</option>`).join('') || '<option value="">Không có</option>';

  if (a.primaryMetric) metricSel.value = a.primaryMetric.name;
  if (a.secondaryMetric) secSel.value = a.secondaryMetric.name;
  if (a.groupDim) groupSel.value = a.groupDim.name;

  renderCharts(a.primaryMetric?.name, a.secondaryMetric?.name, a.timeDim?.name, a.groupDim?.name);
  renderExecutiveTab();
  renderInsightsGrid();
  renderQualityTable();
  renderExplorerTable();
}

function updateChartsFromSelectors() {
  const a = appState.analysis;
  if (!a) return;
  const y1 = document.getElementById('selectMetricCol').value;
  const y2 = document.getElementById('selectSecondaryCol').value;
  const group = document.getElementById('selectGroupCol').value;
  renderCharts(y1, y2, a.timeDim?.name || group, group);
}

function destroyAllCharts() {
  Object.keys(appState.charts).forEach(k => {
    if (appState.charts[k]) {
      appState.charts[k].destroy();
      appState.charts[k] = null;
    }
  });
}

function formatCompactAxis(val) {
  const num = Number(val);
  if (!Number.isFinite(num)) return val;
  if (Math.abs(num) >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + ' Tỷ';
  if (Math.abs(num) >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + ' Tr';
  if (Math.abs(num) >= 1e3) return (num / 1e3).toFixed(0) + ' K';
  return num.toLocaleString('vi-VN');
}

function truncateLabel(str, max = 18) {
  const s = String(str || '');
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

function renderCharts(y1Name, y2Name, trendDimName, groupDimName) {
  const a = appState.analysis;
  if (!a || !y1Name) return;
  destroyAllCharts();

  const aggregateTwo = (dim, bucketByMonth = false) => {
    if (!dim) return [];
    const map = {};
    a.rows.forEach(r => {
      let k = String(r[dim] ?? '').trim() || 'Chưa phân loại';
      if (bucketByMonth && /^\d{4}-\d{2}-\d{2}/.test(k)) {
        k = k.slice(0, 7); // Group daily ISO dates into YYYY-MM for clean trend chart
      }
      if (!map[k]) map[k] = { label: k, v1: 0, v2: 0 };
      map[k].v1 += parseNumeric(r[y1Name]) || 0;
      if (y2Name) map[k].v2 += parseNumeric(r[y2Name]) || 0;
    });
    return Object.values(map);
  };

  let trendData = aggregateTwo(trendDimName || groupDimName, false);
  const isIsoDates = trendData.length > 24 && trendData.every(d => /^\d{4}-\d{2}-\d{2}/.test(d.label));
  if (isIsoDates) {
    trendData = aggregateTwo(trendDimName || groupDimName, true);
  }
  // Sort chronologically if labels look like dates/months
  if (trendData.length > 1 && /^\d{4}-\d{2}/.test(trendData[0].label)) {
    trendData.sort((x, y) => x.label.localeCompare(y.label));
  }

  const groupData = aggregateTwo(groupDimName, false).sort((x, y) => y.v1 - x.v1).slice(0, 8);
  const bluePalette = ['#1d4ed8', '#0ea5e9', '#38bdf8', '#6366f1', '#0284c7', '#2563eb', '#06b6d4', '#93c5fd'];

  document.getElementById('trendChartTitle').textContent = `Xu hướng ${y1Name} theo ${trendDimName || groupDimName}${isIsoDates ? ' (Gộp theo Tháng)' : ''}`;
  document.getElementById('paretoChartTitle').textContent = `Tỷ trọng đóng góp ${y1Name} theo ${groupDimName}`;
  document.getElementById('breakdownChartTitle').textContent = `Xếp hạng ${y1Name} theo ${groupDimName}`;
  document.getElementById('dualCompareTitle').textContent = y2Name ? `Đối chiếu ${y1Name} vs ${y2Name}` : `Phân bổ ${y1Name}`;

  // 1. Trend Chart (clean line, no crowded dots when > 24 points)
  const ctx1 = document.getElementById('trendChartCanvas').getContext('2d');
  const grad = ctx1.createLinearGradient(0, 0, 0, 280);
  grad.addColorStop(0, 'rgba(37, 99, 235, 0.28)');
  grad.addColorStop(1, 'rgba(14, 165, 233, 0.02)');
  const showPoints = trendData.length <= 24;
  appState.charts.trend = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: trendData.map(d => d.label),
      datasets: [{
        label: y1Name,
        data: trendData.map(d => d.v1),
        borderColor: '#2563eb',
        backgroundColor: grad,
        borderWidth: 2.8,
        pointBackgroundColor: '#0ea5e9',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: showPoints ? 4 : 0,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.32
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (ctx) => `${y1Name}: ${formatNumberVN(ctx.parsed.y, true)}` } }
      },
      scales: {
        y: {
          grid: { color: 'rgba(147, 197, 253, 0.25)' },
          ticks: { callback: (v) => formatCompactAxis(v), font: { size: 11 } }
        },
        x: {
          grid: { display: false },
          ticks: { maxTicksLimit: 10, maxRotation: 0, font: { size: 11 } }
        }
      }
    }
  });

  // 2. Pareto Share Doughnut
  const ctx2 = document.getElementById('paretoShareChartCanvas').getContext('2d');
  const totalShare = groupData.reduce((s, d) => s + d.v1, 0) || 1;
  appState.charts.pareto = new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: groupData.map(d => d.label),
      datasets: [{
        data: groupData.map(d => d.v1),
        backgroundColor: groupData.map((_, i) => bluePalette[i % bluePalette.length]),
        borderWidth: 3,
        borderColor: '#ffffff',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '64%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 12,
            font: { size: 11, weight: '600' },
            generateLabels: (chart) => {
              const data = chart.data;
              return data.labels.map((lbl, i) => {
                const val = data.datasets[0].data[i];
                const pct = ((val / totalShare) * 100).toFixed(1);
                return {
                  text: `${truncateLabel(lbl, 20)} (${pct}%)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: '#ffffff',
                  lineWidth: 1,
                  hidden: !chart.getDataVisibility(i),
                  index: i
                };
              });
            }
          }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const pct = ((ctx.parsed / totalShare) * 100).toFixed(1);
              return `${ctx.label}: ${formatNumberVN(ctx.parsed, true)} (${pct}%)`;
            }
          }
        }
      }
    }
  });

  // 3. Horizontal Bar Ranking
  const ctx3 = document.getElementById('breakdownChartCanvas').getContext('2d');
  appState.charts.breakdown = new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: groupData.map(d => truncateLabel(d.label, 20)),
      datasets: [{
        label: y1Name,
        data: groupData.map(d => d.v1),
        backgroundColor: groupData.map((_, i) => bluePalette[i % bluePalette.length]),
        borderRadius: 8,
        maxBarThickness: 38
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => groupData[items[0].dataIndex]?.label || '',
            label: (ctx) => `${y1Name}: ${formatNumberVN(ctx.parsed.x, true)}`
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(147, 197, 253, 0.25)' },
          ticks: { callback: (v) => formatCompactAxis(v), maxTicksLimit: 6, font: { size: 11 } }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 11, weight: '600' } }
        }
      }
    }
  });

  // 4. Dual Metric Compare
  const ctx4 = document.getElementById('dualCompareChartCanvas').getContext('2d');
  const dualDatasets = [{
    label: y1Name,
    data: groupData.map(d => d.v1),
    backgroundColor: '#2563eb',
    borderRadius: 6,
    maxBarThickness: 36
  }];
  if (y2Name) {
    dualDatasets.push({
      label: y2Name,
      data: groupData.map(d => d.v2),
      backgroundColor: '#38bdf8',
      borderRadius: 6,
      maxBarThickness: 36
    });
  }
  appState.charts.dual = new Chart(ctx4, {
    type: 'bar',
    data: { labels: groupData.map(d => truncateLabel(d.label, 16)), datasets: dualDatasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 12, padding: 14, font: { size: 11, weight: '600' } } },
        tooltip: {
          callbacks: {
            title: (items) => groupData[items[0].dataIndex]?.label || '',
            label: (ctx) => `${ctx.dataset.label}: ${formatNumberVN(ctx.parsed.y, true)}`
          }
        }
      },
      scales: {
        y: {
          grid: { color: 'rgba(147, 197, 253, 0.25)' },
          ticks: { callback: (v) => formatCompactAxis(v), font: { size: 11 } }
        },
        x: {
          grid: { display: false },
          ticks: { maxRotation: 0, font: { size: 11, weight: '600' } }
        }
      }
    }
  });
}

function renderExecutiveTab() {
  const a = appState.analysis;
  const er = a?.executiveReport;
  if (!er) return;

  // Letterhead Metadata
  const now = new Date();
  const codeStr = `BCKD-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  document.getElementById('rptCompanyName').textContent = er.company;
  document.getElementById('rptIndustry').textContent = `Lĩnh vực kinh doanh: ${er.industry}`;
  document.getElementById('rptCode').textContent = `Số: ${codeStr}`;
  document.getElementById('rptDate').textContent = `Ngày lập: ${now.toLocaleDateString('vi-VN')}`;
  document.getElementById('rptSource').textContent = `Kỳ / Nguồn dữ liệu: ${a.datasetName} (${a.totalRows} giao dịch)`;
  document.getElementById('rptObjective').textContent = `Mục tiêu kinh doanh: ${er.objective}`;
  document.getElementById('rptQuestion').textContent = `Trọng tâm đánh giá: "${er.question}"`;

  // Mục I: Business Performance KPIs
  const pm = a.primaryMetric;
  const sm = a.secondaryMetric;
  const grossDelta = (pm && sm) ? (pm.sum - sm.sum) : null;
  const rptKpis = [
    { label: pm ? `Tổng ${pm.name}` : 'Doanh số / Đầu ra', val: pm ? formatNumberVN(pm.sum, true) : '—' },
    { label: sm ? `Tổng ${sm.name}` : 'Tổng bản ghi', val: sm ? formatNumberVN(sm.sum, true) : `${a.totalRows}` },
    { label: grossDelta !== null ? 'Chênh lệch / Lãi gộp' : 'Tỷ trọng Top nhóm', val: grossDelta !== null ? `${formatNumberVN(grossDelta, true)} (${er.overallMargin.toFixed(1)}%)` : `${a.topNShare.toFixed(1)}%` },
    { label: 'Quy mô & Sức khỏe DL', val: `${a.totalRows} dòng · ${a.healthScore}/100` }
  ];
  document.getElementById('rptSummaryKpis').innerHTML = rptKpis.map(k => `
    <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-200">
      <div class="text-[10px] font-bold text-slate-500 uppercase">${escapeHtml(k.label)}</div>
      <div class="text-sm sm:text-base font-extrabold text-blue-950 mt-0.5">${escapeHtml(k.val)}</div>
    </div>
  `).join('');

  document.getElementById('execQuestionBadge').textContent = `Mục tiêu: ${er.objective}`;
  document.getElementById('execDirectAnswer').innerHTML = er.directAnswer
    .split('\n')
    .map(line => `<p>${escapeHtml(line).replace(/\*\*(.+?)\*\*/g, '<strong class="text-slate-900">$1</strong>')}</p>`)
    .join('');

  // Mục II: Deep Dashboard Synthesis Cards (Dashboard tab) + Formal Table (Executive Report tab)
  const deepCardsHtml = (er.dashboardDeepDive || []).map(item => `
    <div class="p-4 rounded-xl bg-blue-50/55 border border-blue-100 space-y-2">
      <div class="flex items-center justify-between gap-2 flex-wrap">
        <div class="font-extrabold text-blue-900 flex items-center gap-1.5">
          <i class="fa-solid fa-chart-simple text-blue-600"></i>
          <span>${escapeHtml(item.chart)}</span>
        </div>
        ${item.metricBadge ? `<span class="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-extrabold">${escapeHtml(item.metricBadge)}</span>` : ''}
      </div>
      <p class="text-slate-700 leading-relaxed"><strong>Số liệu Dashboard:</strong> ${escapeHtml(item.finding)}</p>
      ${item.impact ? `<p class="text-slate-600 leading-relaxed"><strong>Tác động quản trị:</strong> ${escapeHtml(item.impact)}</p>` : ''}
      <p class="text-emerald-800 font-semibold bg-emerald-50/80 border border-emerald-100 rounded-lg px-2.5 py-1.5">
        <i class="fa-solid fa-lightbulb text-emerald-600 mr-1"></i> <strong>Đề xuất:</strong> ${escapeHtml(item.recommendation)}
      </p>
    </div>
  `).join('');

  const dashDeepGrid = document.getElementById('dashboardDeepDiveGrid');
  if (dashDeepGrid) dashDeepGrid.innerHTML = deepCardsHtml;

  const execDeepTable = document.getElementById('execDeepDiveTable');
  if (execDeepTable) {
    execDeepTable.innerHTML = `
      <thead class="bg-blue-900 text-white">
        <tr>
          <th class="px-3.5 py-2.5 font-extrabold w-1/5">Khía cạnh Dashboard</th>
          <th class="px-3.5 py-2.5 font-extrabold w-2/5">Phân tích Số liệu &amp; Tác động Quản trị</th>
          <th class="px-3.5 py-2.5 font-extrabold w-2/5">Đề xuất Điều hành</th>
        </tr>
      </thead>
      <tbody>
        ${(er.dashboardDeepDive || []).map(item => `
          <tr class="border-t border-blue-100 align-top hover:bg-blue-50/30">
            <td class="px-3.5 py-3">
              <div class="font-extrabold text-blue-900">${escapeHtml(item.chart)}</div>
              ${item.metricBadge ? `<span class="inline-block mt-1 px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">${escapeHtml(item.metricBadge)}</span>` : ''}
            </td>
            <td class="px-3.5 py-3 space-y-1 text-slate-700 leading-relaxed">
              <p><strong>Số liệu:</strong> ${escapeHtml(item.finding)}</p>
              ${item.impact ? `<p class="text-slate-600"><strong>Tác động:</strong> ${escapeHtml(item.impact)}</p>` : ''}
            </td>
            <td class="px-3.5 py-3 text-emerald-900 font-semibold bg-emerald-50/40 leading-relaxed">
              ${escapeHtml(item.recommendation)}
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }

  // Mục IV: 3-Column Decision Matrix
  const cols = [
    { title: 'Nhân rộng (Scale Up)', icon: 'fa-rocket', badge: 'bg-emerald-100 text-emerald-800', border: 'border-t-4 border-t-emerald-500', items: er.decisionMatrix.scale },
    { title: 'Tối ưu (Optimize)', icon: 'fa-wrench', badge: 'bg-blue-100 text-blue-800', border: 'border-t-4 border-t-blue-500', items: er.decisionMatrix.optimize },
    { title: 'Kiểm soát Rủi ro (Mitigate)', icon: 'fa-shield-halved', badge: 'bg-amber-100 text-amber-800', border: 'border-t-4 border-t-amber-500', items: er.decisionMatrix.mitigate }
  ];

  document.getElementById('decisionMatrixGrid').innerHTML = cols.map(c => `
    <div class="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3 ${c.border}">
      <div class="flex items-center justify-between">
        <h4 class="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <i class="fa-solid ${c.icon}"></i> ${c.title}
        </h4>
        <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${c.badge}">${c.items.length}</span>
      </div>
      <div class="space-y-2 text-xs">
        ${c.items.length ? c.items.map(it => `
          <div class="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
            <div class="font-extrabold text-slate-800">${escapeHtml(it.entity)}</div>
            <div class="text-[11px] font-bold text-blue-700">${escapeHtml(it.metric)}</div>
            <p class="text-[11px] text-slate-600">${escapeHtml(it.reason)}</p>
          </div>
        `).join('') : '<p class="text-slate-400 italic text-[11px]">Không có mục nào thuộc nhóm này.</p>'}
      </div>
    </div>
  `).join('');

  // Mục III: Group Efficiency Table with Totals Footer
  const effTable = document.getElementById('groupEfficiencyTable');
  const pmName = a.primaryMetric?.name || 'Chỉ số chính';
  const smName = a.secondaryMetric?.name;
  const totalCount = a.categoryBreakdown.reduce((s, g) => s + g.count, 0);
  const totalP = a.categoryBreakdown.reduce((s, g) => s + g.primarySum, 0);
  const totalS = a.categoryBreakdown.reduce((s, g) => s + g.secondarySum, 0);

  effTable.innerHTML = `
    <thead class="bg-blue-900 text-white">
      <tr>
        <th class="px-3.5 py-2.5 font-extrabold">${escapeHtml(a.groupDim?.name || 'Phân nhóm')}</th>
        <th class="px-3.5 py-2.5 font-extrabold text-right">Số giao dịch</th>
        <th class="px-3.5 py-2.5 font-extrabold text-right">Tổng ${escapeHtml(pmName)}</th>
        <th class="px-3.5 py-2.5 font-extrabold text-right">Tỷ trọng (%)</th>
        ${smName ? `<th class="px-3.5 py-2.5 font-extrabold text-right">Tổng ${escapeHtml(smName)}</th><th class="px-3.5 py-2.5 font-extrabold text-right">Chênh lệch / Lãi gộp</th><th class="px-3.5 py-2.5 font-extrabold text-right">Biên (%)</th>` : `<th class="px-3.5 py-2.5 font-extrabold text-right">TB / dòng</th>`}
      </tr>
    </thead>
    <tbody>
      ${a.categoryBreakdown.map(g => {
        const sharePct = totalP > 0 ? ((g.primarySum / totalP) * 100).toFixed(1) + '%' : '0%';
        return `
        <tr class="border-t border-blue-100 hover:bg-blue-50/40">
          <td class="px-3.5 py-2.5 font-extrabold text-slate-800">${escapeHtml(g.label)}</td>
          <td class="px-3.5 py-2.5 text-right text-slate-600">${g.count}</td>
          <td class="px-3.5 py-2.5 text-right font-bold text-blue-700">${formatNumberVN(g.primarySum, true)}</td>
          <td class="px-3.5 py-2.5 text-right font-semibold text-slate-700">${sharePct}</td>
          ${smName ? `<td class="px-3.5 py-2.5 text-right text-slate-700">${formatNumberVN(g.secondarySum, true)}</td><td class="px-3.5 py-2.5 text-right font-bold text-slate-900">${formatNumberVN(g.netDelta, true)}</td><td class="px-3.5 py-2.5 text-right font-extrabold ${g.marginPct >= er.overallMargin ? 'text-emerald-600' : 'text-amber-600'}">${g.marginPct !== null ? g.marginPct.toFixed(1) + '%' : '—'}</td>` : `<td class="px-3.5 py-2.5 text-right text-slate-600">${formatNumberVN(g.primaryAvg, true)}</td>`}
        </tr>`;
      }).join('')}
    </tbody>
    <tfoot class="bg-blue-50 font-extrabold text-blue-950 border-t-2 border-blue-200">
      <tr>
        <td class="px-3.5 py-2.5">Tổng cộng toàn kỳ</td>
        <td class="px-3.5 py-2.5 text-right">${totalCount}</td>
        <td class="px-3.5 py-2.5 text-right">${formatNumberVN(totalP, true)}</td>
        <td class="px-3.5 py-2.5 text-right">100%</td>
        ${smName ? `<td class="px-3.5 py-2.5 text-right">${formatNumberVN(totalS, true)}</td><td class="px-3.5 py-2.5 text-right">${formatNumberVN(totalP - totalS, true)}</td><td class="px-3.5 py-2.5 text-right">${er.overallMargin.toFixed(1)}%</td>` : `<td class="px-3.5 py-2.5 text-right">${totalCount ? formatNumberVN(totalP / totalCount, true) : '—'}</td>`}
      </tr>
    </tfoot>
  `;

  // Mục VI: Action Plan & RACI Table
  const actionTable = document.getElementById('execActionPlanTable');
  if (actionTable) {
    actionTable.innerHTML = `
      <thead class="bg-blue-900 text-white">
        <tr>
          <th class="px-3 py-2.5 font-extrabold">STT</th>
          <th class="px-3 py-2.5 font-extrabold">Hạng mục &amp; Ưu tiên</th>
          <th class="px-3 py-2.5 font-extrabold">Căn cứ Dữ liệu</th>
          <th class="px-3 py-2.5 font-extrabold">Hành động Đề xuất</th>
          <th class="px-3 py-2.5 font-extrabold">KPI Đo lường</th>
          <th class="px-3 py-2.5 font-extrabold">Phụ trách</th>
        </tr>
      </thead>
      <tbody>
        ${(a.insights || []).map((ins, idx) => `
          <tr class="border-t border-blue-100 align-top hover:bg-blue-50/30">
            <td class="px-3 py-2.5 font-bold text-slate-500">${idx + 1}</td>
            <td class="px-3 py-2.5">
              <div class="font-extrabold text-slate-800">${escapeHtml(ins.tag)}</div>
              <span class="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${ins.priority === 'Cao' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}">Ưu tiên: ${escapeHtml(ins.priority)}</span>
            </td>
            <td class="px-3 py-2.5 text-slate-600">${escapeHtml(ins.data)}</td>
            <td class="px-3 py-2.5 font-semibold text-emerald-900">${escapeHtml(ins.action)}</td>
            <td class="px-3 py-2.5 font-bold text-blue-800">${escapeHtml(ins.kpi || '—')}</td>
            <td class="px-3 py-2.5 font-semibold text-slate-700">${escapeHtml(ins.owner)}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }

  // Anomaly Deep-Dive
  const anomBox = document.getElementById('anomalyContainer');
  if (!a.anomalyRecords.length) {
    anomBox.innerHTML = '<p class="text-emerald-700 font-bold">✅ Không phát hiện điểm ngoại lai (Outlier) bất thường theo quy tắc IQR.</p>';
  } else {
    anomBox.innerHTML = `
      <div class="overflow-x-auto rounded-xl border border-amber-200">
        <table class="w-full text-left text-xs border-collapse">
          <thead class="bg-amber-50 text-amber-900">
            <tr>
              <th class="px-3 py-2 font-extrabold">Dòng</th>
              <th class="px-3 py-2 font-extrabold">Ngữ cảnh dòng</th>
              <th class="px-3 py-2 font-extrabold">Cột bất thường</th>
              <th class="px-3 py-2 font-extrabold">Giá trị</th>
              <th class="px-3 py-2 font-extrabold">Phân loại</th>
            </tr>
          </thead>
          <tbody>
            ${a.anomalyRecords.slice(0, 12).map(r => `
              <tr class="border-t border-amber-100">
                <td class="px-3 py-2 font-bold text-slate-700">#${r.rowIndex}</td>
                <td class="px-3 py-2 text-slate-600">${escapeHtml(r.contextLabel)}</td>
                <td class="px-3 py-2 font-bold text-blue-800">${escapeHtml(r.column)}</td>
                <td class="px-3 py-2 font-extrabold text-amber-700">${formatNumberVN(r.value, true)}</td>
                <td class="px-3 py-2"><span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">${escapeHtml(r.direction)}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>`;
  }
}

function renderQualityTable() {
  const a = appState.analysis;
  const table = document.getElementById('qualityTable');
  if (!a || !table) return;

  const head = `
    <thead class="bg-blue-50 text-blue-900">
      <tr>
        <th class="px-3.5 py-2.5 font-extrabold">Tên cột</th>
        <th class="px-3.5 py-2.5 font-extrabold">Kiểu dữ liệu</th>
        <th class="px-3.5 py-2.5 font-extrabold">Giá trị thiếu</th>
        <th class="px-3.5 py-2.5 font-extrabold">Duy nhất</th>
        <th class="px-3.5 py-2.5 font-extrabold">Ngoại lai</th>
        <th class="px-3.5 py-2.5 font-extrabold">Thống kê chi tiết</th>
      </tr>
    </thead>`;

  const body = a.colProfiles.map(c => {
    const typeBadge = c.type === 'number'
      ? '<span class="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold">Số (Numeric)</span>'
      : '<span class="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 font-bold">Phân loại</span>';
    const missBadge = c.missing > 0
      ? `<span class="text-amber-700 font-extrabold">${c.missing} (${c.missingPct.toFixed(1)}%)</span>`
      : '<span class="text-emerald-600 font-bold">0</span>';
    const stats = c.type === 'number'
      ? `TB: ${formatNumberVN(c.mean, true)} · Độ lệch: ${formatNumberVN(c.stdDev, true)} · Min/Max: ${formatNumberVN(c.min, true)} / ${formatNumberVN(c.max, true)}`
      : (c.topCategory ? `Phổ biến: ${escapeHtml(c.topCategory.label)} (${c.topCategory.count})` : '—');

    return `
      <tr class="border-t border-blue-50 hover:bg-blue-50/40">
        <td class="px-3.5 py-2.5 font-extrabold text-slate-800">${escapeHtml(c.name)}</td>
        <td class="px-3.5 py-2.5">${typeBadge}</td>
        <td class="px-3.5 py-2.5">${missBadge}</td>
        <td class="px-3.5 py-2.5 font-semibold text-slate-600">${c.uniqueCount}</td>
        <td class="px-3.5 py-2.5 font-semibold ${c.outliers > 0 ? 'text-amber-600' : 'text-slate-500'}">${c.outliers}</td>
        <td class="px-3.5 py-2.5 text-slate-600">${stats}</td>
      </tr>`;
  }).join('');

  table.innerHTML = head + `<tbody>${body}</tbody>`;
}

function runAutoClean() {
  if (!appState.analysis) return;
  const { cleanedRows, report } = cleanDataset(appState.analysis.rows);
  appState.stagedRows = cleanedRows;
  appState.analysis = analyzeDataset(cleanedRows, appState.analysis.datasetName, appState.businessContext);
  renderWorkspace();

  const banner = document.getElementById('cleanReportBanner');
  banner.textContent = `✅ Đã làm sạch hoàn tất: Điền ${report.filledMissing} ô thiếu, xóa ${report.removedDuplicates} dòng trùng lặp, chuẩn hóa ${report.trimmedStrings} chuỗi ký tự.`;
  banner.classList.remove('hidden');
  switchWsTab('quality');
}

function renderInsightsGrid() {
  const a = appState.analysis;
  const grid = document.getElementById('insightsGrid');
  if (!a || !grid) return;

  grid.innerHTML = a.insights.map(ins => {
    const prioCls = ins.priority === 'Cao' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800';
    return `
      <div class="glass-card rounded-2xl p-5 space-y-3">
        <div class="flex items-center justify-between gap-2">
          <span class="px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-[11px] font-extrabold text-sky-700">${escapeHtml(ins.tag)}</span>
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${prioCls}">Ưu tiên: ${escapeHtml(ins.priority)}</span>
        </div>
        <div class="space-y-2 text-xs">
          <div class="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100">
            <span class="font-extrabold text-blue-900">DATA:</span>
            <span class="text-slate-700">${escapeHtml(ins.data)}</span>
          </div>
          <div>
            <span class="font-extrabold text-slate-800">INSIGHT:</span>
            <span class="text-slate-600">${escapeHtml(ins.insight)}</span>
          </div>
          <div class="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
            <span class="font-extrabold text-emerald-800">ACTION:</span>
            <span class="text-emerald-950 font-semibold">${escapeHtml(ins.action)}</span>
          </div>
          ${ins.kpi ? `<div class="text-[11px] font-bold text-blue-700"><i class="fa-solid fa-flag-checkered mr-1"></i> KPI đo lường: ${escapeHtml(ins.kpi)}</div>` : ''}
        </div>
        <div class="pt-2 border-t border-blue-50 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
          <span><i class="fa-solid fa-user-tie text-blue-500 mr-1"></i> ${escapeHtml(ins.owner)}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderExplorerTable() {
  const a = appState.analysis;
  const table = document.getElementById('explorerTable');
  const q = (document.getElementById('explorerSearch')?.value || '').toLowerCase().trim();
  if (!a || !table) return;

  const filtered = q
    ? a.rows.filter(r => Object.values(r).some(v => String(v ?? '').toLowerCase().includes(q)))
    : a.rows;

  document.getElementById('explorerCountBadge').textContent = `${filtered.length} / ${a.totalRows} dòng`;

  const head = `<thead class="bg-blue-50 text-blue-900 sticky top-0"><tr>${a.columns.map(c => `<th class="px-3 py-2 font-extrabold whitespace-nowrap">${escapeHtml(c)}</th>`).join('')}</tr></thead>`;
  const body = filtered.slice(0, 200).map(r => `
    <tr class="border-t border-blue-50 hover:bg-blue-50/40">
      ${a.columns.map(c => `<td class="px-3 py-2 text-slate-700 whitespace-nowrap">${escapeHtml(r[c] ?? '')}</td>`).join('')}
    </tr>
  `).join('');

  table.innerHTML = head + `<tbody>${body}</tbody>`;
}

function switchWsTab(tabName) {
  document.querySelectorAll('[data-ws-tab]').forEach(btn => {
    btn.classList.toggle('is-active', btn.getAttribute('data-ws-tab') === tabName);
  });
  document.querySelectorAll('.ws-tab-panel').forEach(panel => {
    panel.classList.toggle('is-active', panel.id === `wsTab-${tabName}`);
  });
}

// ==================== EXPORT ====================
function printExecutiveReport() {
  switchWsTab('executive');
  setTimeout(() => window.print(), 150);
}

function exportExcel() {
  const a = appState.analysis;
  if (!a || typeof XLSX === 'undefined') return;
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(a.rows), 'Du_Lieu_Phan_Tich');

  const summaryRows = a.colProfiles.map(c => ({
    Cot: c.name, Kieu: c.type, Gia_Tri_Thieu: c.missing, Duy_Nhat: c.uniqueCount,
    Tong: c.sum ?? '', Trung_Binh: c.mean ?? '', Min: c.min ?? '', Max: c.max ?? ''
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(summaryRows), 'Thong_Ke_Cot');

  const ctx = a.businessContext || {};
  const ctxSheet = XLSX.utils.json_to_sheet([{
    Doanh_Nghiep: ctx.companyName,
    Linh_Vuc: ctx.industry,
    Muc_Tieu: ctx.objective,
    Cau_Hoi_Quan_Tri: ctx.question,
    Ghi_Chu_Lam_Sach: appState.cleaningNote || 'Mặc định',
    Giai_Dap_AI: a.executiveReport?.directAnswer || ''
  }]);
  XLSX.utils.book_append_sheet(wb, ctxSheet, 'Boi_Canh_Quyet_Dinh');

  XLSX.writeFile(wb, `AzurePulse_${a.datasetName.replace(/\s+/g, '_')}.xlsx`);
}

function exportCsv() {
  const a = appState.analysis;
  if (!a) return;
  const cols = a.columns;
  const lines = [cols.join(',')];
  a.rows.forEach(r => {
    lines.push(cols.map(c => `"${String(r[c] ?? '').replace(/"/g, '""')}"`).join(','));
  });
  const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `AzurePulse_${a.datasetName.replace(/\s+/g, '_')}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function exportWord() {
  const a = appState.analysis;
  const er = a?.executiveReport;
  if (!a || !er) return;

  const now = new Date();
  const codeStr = `BCQT-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const pmName = a.primaryMetric?.name || 'Chỉ số chính';
  const smName = a.secondaryMetric?.name;

  const deepRowsHtml = (er.dashboardDeepDive || []).map(item => `
    <tr>
      <td style="border:1px solid #cbd5e1;padding:8px;font-weight:bold;color:#1e3a8a;">${escapeHtml(item.chart)}<br/><span style="font-size:10pt;color:#2563eb;">${escapeHtml(item.metricBadge || '')}</span></td>
      <td style="border:1px solid #cbd5e1;padding:8px;"><strong>Số liệu:</strong> ${escapeHtml(item.finding)}<br/><strong>Tác động:</strong> ${escapeHtml(item.impact || '')}</td>
      <td style="border:1px solid #cbd5e1;padding:8px;background:#f0fdf4;">${escapeHtml(item.recommendation)}</td>
    </tr>
  `).join('');

  const effRowsHtml = a.categoryBreakdown.map(g => `
    <tr>
      <td style="border:1px solid #cbd5e1;padding:6px;font-weight:bold;">${escapeHtml(g.label)}</td>
      <td style="border:1px solid #cbd5e1;padding:6px;text-align:right;">${g.count}</td>
      <td style="border:1px solid #cbd5e1;padding:6px;text-align:right;">${formatNumberVN(g.primarySum, true)}</td>
      <td style="border:1px solid #cbd5e1;padding:6px;text-align:right;">${formatNumberVN(g.primaryAvg, true)}</td>
      ${smName ? `<td style="border:1px solid #cbd5e1;padding:6px;text-align:right;">${formatNumberVN(g.secondarySum, true)}</td><td style="border:1px solid #cbd5e1;padding:6px;text-align:right;">${g.marginPct !== null ? g.marginPct.toFixed(1) + '%' : '—'}</td>` : ''}
    </tr>
  `).join('');

  const actionRowsHtml = (a.insights || []).map((ins, idx) => `
    <tr>
      <td style="border:1px solid #cbd5e1;padding:6px;text-align:center;">${idx + 1}</td>
      <td style="border:1px solid #cbd5e1;padding:6px;font-weight:bold;">${escapeHtml(ins.tag)} (${escapeHtml(ins.priority)})</td>
      <td style="border:1px solid #cbd5e1;padding:6px;">${escapeHtml(ins.data)}</td>
      <td style="border:1px solid #cbd5e1;padding:6px;">${escapeHtml(ins.action)}</td>
      <td style="border:1px solid #cbd5e1;padding:6px;">${escapeHtml(ins.kpi || '—')}</td>
      <td style="border:1px solid #cbd5e1;padding:6px;">${escapeHtml(ins.owner)}</td>
    </tr>
  `).join('');

  const matrixHtml = [
    { title: 'Nhân rộng (Scale Up)', items: er.decisionMatrix.scale },
    { title: 'Tối ưu (Optimize)', items: er.decisionMatrix.optimize },
    { title: 'Kiểm soát Rủi ro (Mitigate)', items: er.decisionMatrix.mitigate }
  ].map(col => `
    <td style="width:33%;vertical-align:top;border:1px solid #cbd5e1;padding:8px;">
      <p style="font-weight:bold;color:#1e3a8a;margin:0 0 6px 0;">${col.title} (${col.items.length})</p>
      ${col.items.length ? col.items.map(it => `<p style="margin:0 0 6px 0;font-size:10pt;"><strong>${escapeHtml(it.entity)}</strong> (${escapeHtml(it.metric)})<br/>${escapeHtml(it.reason)}</p>`).join('') : '<p style="color:#64748b;font-style:italic;">Không có mục nào.</p>'}
    </td>
  `).join('');

  const wordHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset="utf-8"><title>Báo cáo Quản trị - ${escapeHtml(er.company)}</title>
    <style>
      body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11pt; color: #0f172a; line-height: 1.45; }
      h1 { font-size: 16pt; color: #1e3a8a; text-align: center; margin: 10px 0 4px; }
      h2 { font-size: 12pt; color: #1e3a8a; border-left: 4px solid #1d4ed8; padding-left: 8px; margin: 16px 0 8px; text-transform: uppercase; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 10pt; }
      th { background: #1e3a8a; color: #ffffff; border: 1px solid #1e3a8a; padding: 7px; text-align: left; }
    </style></head>
    <body>
      <table style="border:none;border-bottom:2px solid #1e3a8a;margin-bottom:12px;">
        <tr>
          <td style="border:none;vertical-align:top;">
            <strong style="font-size:12pt;color:#1e3a8a;">${escapeHtml(er.company.toUpperCase())}</strong><br/>
            Lĩnh vực: ${escapeHtml(er.industry)}<br/>
            Đơn vị lập: AzurePulse AI BI Agent
          </td>
          <td style="border:none;vertical-align:top;text-align:right;">
            <strong>Số: ${codeStr}</strong><br/>
            Ngày lập: ${now.toLocaleDateString('vi-VN')}<br/>
            Nguồn: ${escapeHtml(a.datasetName)} (${a.totalRows} dòng)
          </td>
        </tr>
      </table>

      <h1>BÁO CÁO KẾT QUẢ HOẠT ĐỘNG KINH DOANH</h1>
      <p style="text-align:center;color:#1d4ed8;font-weight:bold;margin:0 0 4px;">Mục tiêu kinh doanh: ${escapeHtml(er.objective)}</p>
      <p style="text-align:center;font-style:italic;color:#475569;margin:0 0 14px;">Trọng tâm đánh giá: "${escapeHtml(er.question)}"</p>

      <h2>I. Tổng quan Kết quả Kinh doanh</h2>
      <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:10px;margin-bottom:10px;">
        ${er.directAnswer.split('\n').map(l => `<p style="margin:4px 0;">${escapeHtml(l).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>`).join('')}
      </div>

      <h2>II. Phân tích Biến động &amp; Xu hướng Kinh doanh (Từ Dashboard)</h2>
      <table>
        <thead><tr><th style="width:22%;">Khía cạnh Dashboard</th><th style="width:42%;">Diễn biến &amp; Số liệu Kinh doanh</th><th style="width:36%;">Kiến nghị Kinh doanh</th></tr></thead>
        <tbody>${deepRowsHtml}</tbody>
      </table>

      <h2>III. Cơ cấu Doanh thu – Chi phí – Hiệu quả theo Phân nhóm</h2>
      <table>
        <thead><tr>
          <th>${escapeHtml(a.groupDim?.name || 'Nhóm')}</th><th style="text-align:right;">Số dòng</th><th style="text-align:right;">Tổng ${escapeHtml(pmName)}</th><th style="text-align:right;">TB / dòng</th>
          ${smName ? `<th style="text-align:right;">Tổng ${escapeHtml(smName)}</th><th style="text-align:right;">Biên (%)</th>` : ''}
        </tr></thead>
        <tbody>${effRowsHtml}</tbody>
      </table>

      <h2>IV. Đánh giá Cơ hội Tăng trưởng &amp; Kiểm soát Rủi ro Kinh doanh</h2>
      <table><tr>${matrixHtml}</tr></table>

      <h2>V. Kế hoạch Hành động Kinh doanh &amp; Chỉ tiêu KPI Kỳ tới</h2>
      <table>
        <thead><tr><th>STT</th><th>Hạng mục</th><th>Số liệu Căn cứ</th><th>Giải pháp Kinh doanh</th><th>KPI</th><th>Phụ trách</th></tr></thead>
        <tbody>${actionRowsHtml}</tbody>
      </table>

      <h2>VI. Phê duyệt của Ban Giám đốc / Lãnh đạo Kinh doanh</h2>
      <table style="border:none;margin-top:16px;">
        <tr>
          <td style="border:none;width:55%;"></td>
          <td style="border:1px solid #cbd5e1;padding:14px;text-align:center;">
            <strong>BAN GIÁM ĐỐC / LÃNH ĐẠO PHÊ DUYỆT</strong><br/>
            <span style="font-size:9.5pt;color:#64748b;">(Kiểm duyệt &amp; Ký duyệt ban hành)</span>
            <br/><br/><br/><br/>
            <span style="font-size:9.5pt;color:#94a3b8;font-style:italic;">(Ký, ghi rõ họ tên &amp; đóng dấu)</span>
          </td>
        </tr>
      </table>
    </body></html>
  `;

  const blob = new Blob(['\uFEFF' + wordHtml], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Bao_Cao_Quan_Tri_${er.company.replace(/\s+/g, '_')}.doc`;
  link.click();
  URL.revokeObjectURL(url);
}

// ==================== AI COPILOT CHAT ====================
function toggleChat(open) {
  const drawer = document.getElementById('chatDrawer');
  const fab = document.getElementById('chatFab');
  drawer.classList.toggle('hidden', !open);
  fab.classList.toggle('hidden', open);
}

function sendQuickPrompt(text) {
  document.getElementById('chatInput').value = text;
  handleChatSubmit(new Event('submit'));
}

async function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  const messages = document.getElementById('chatMessages');
  messages.innerHTML += `
    <div class="flex justify-end">
      <div class="max-w-[85%] p-3 rounded-2xl rounded-tr-sm bg-blue-600 text-white font-medium shadow-sm">${escapeHtml(text)}</div>
    </div>`;
  messages.scrollTop = messages.scrollHeight;

  const mode = document.getElementById('copilotMode').value;
  const reply = await answerDataQuestion(text, appState.analysis, mode);
  const formatted = escapeHtml(reply)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');

  messages.innerHTML += `
    <div class="flex justify-start">
      <div class="max-w-[90%] p-3 rounded-2xl rounded-tl-sm bg-blue-50 border border-blue-100 text-slate-800 leading-relaxed">${formatted}</div>
    </div>`;
  messages.scrollTop = messages.scrollHeight;
}

// ==================== HISTORY & SETTINGS MODALS ====================
function saveToHistory(analysis) {
  const entry = {
    name: `${analysis.businessContext?.companyName || ''} · ${analysis.datasetName}`,
    rows: analysis.totalRows,
    cols: analysis.totalCols,
    health: analysis.healthScore,
    time: new Date().toLocaleString('vi-VN')
  };
  appState.history = [entry, ...appState.history.filter(h => h.name !== entry.name)].slice(0, 8);
  localStorage.setItem('azurepulse_history', JSON.stringify(appState.history));
}

function openHistoryModal() {
  const body = document.getElementById('historyListBody');
  if (!appState.history.length) {
    body.innerHTML = '<p class="text-slate-500 text-center py-6">Chưa có lịch sử phân tích nào.</p>';
  } else {
    body.innerHTML = appState.history.map(h => `
      <div class="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
        <div>
          <p class="font-extrabold text-slate-800">${escapeHtml(h.name)}</p>
          <p class="text-[11px] text-slate-500">${h.rows} dòng · ${h.cols} cột · ${escapeHtml(h.time)}</p>
        </div>
        <span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px]">${h.health}/100</span>
      </div>
    `).join('');
  }
  document.getElementById('historyModal').classList.remove('hidden');
  document.getElementById('historyModal').classList.add('flex');
}

function closeHistoryModal() {
  document.getElementById('historyModal').classList.add('hidden');
  document.getElementById('historyModal').classList.remove('flex');
}

function openSettingsModal() {
  document.getElementById('geminiKeyInput').value = localStorage.getItem('azurepulse_gemini_key') || '';
  document.getElementById('settingsModal').classList.remove('hidden');
  document.getElementById('settingsModal').classList.add('flex');
}

function closeSettingsModal() {
  document.getElementById('settingsModal').classList.add('hidden');
  document.getElementById('settingsModal').classList.remove('flex');
}

function saveSettings() {
  const key = document.getElementById('geminiKeyInput').value.trim();
  if (key) localStorage.setItem('azurepulse_gemini_key', key);
  else localStorage.removeItem('azurepulse_gemini_key');
  closeSettingsModal();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
