/**
 * AzurePulse AI · Deep In-Browser Data Analysis & Executive BI Engine
 * Combines Business Context with multi-dimensional statistical profiling,
 * Pareto concentration, dual-metric efficiency, anomaly row extraction,
 * and Executive Decision Matrix generation.
 */

const SAMPLE_DATASETS = {
  retail_sales: {
    id: 'retail_sales',
    name: 'Doanh thu Bán lẻ & TMĐT 2026',
    category: 'Kinh doanh & E-commerce',
    description: '18 dòng giao dịch tổng hợp theo tháng, kênh bán (Shopee, TikTok Shop, Website, Cửa hàng) và khu vực.',
    defaultContext: {
      companyName: 'Công ty TNHH TMĐT BlueRetail',
      industry: 'Thương mại điện tử & Bán lẻ',
      objective: 'Tối ưu doanh thu & biên lợi nhuận',
      question: 'Kênh bán nào đang có hiệu quả lợi nhuận tốt nhất và khu vực/danh mục nào có tỷ lệ hoàn hàng đáng lo ngại?'
    },
    rows: [
      { Thang: '2026-01', Kenh_Ban: 'Shopee', Danh_Muc: 'Điện tử', Khu_Vuc: 'TP.HCM', So_Don: 420, Doanh_Thu: 580000000, Chi_Phi: 410000000, Ty_Le_Hoan: 3.2 },
      { Thang: '2026-01', Kenh_Ban: 'TikTok Shop', Danh_Muc: 'Thời trang', Khu_Vuc: 'Hà Nội', So_Don: 610, Doanh_Thu: 390000000, Chi_Phi: 295000000, Ty_Le_Hoan: 6.8 },
      { Thang: '2026-01', Kenh_Ban: 'Website', Danh_Muc: 'Gia dụng', Khu_Vuc: 'Đà Nẵng', So_Don: 185, Doanh_Thu: 245000000, Chi_Phi: 162000000, Ty_Le_Hoan: 1.9 },
      { Thang: '2026-02', Kenh_Ban: 'Shopee', Danh_Muc: 'Điện tử', Khu_Vuc: 'TP.HCM', So_Don: 455, Doanh_Thu: 625000000, Chi_Phi: 438000000, Ty_Le_Hoan: 3.0 },
      { Thang: '2026-02', Kenh_Ban: 'TikTok Shop', Danh_Muc: 'Mỹ phẩm', Khu_Vuc: 'TP.HCM', So_Don: 740, Doanh_Thu: 470000000, Chi_Phi: 330000000, Ty_Le_Hoan: 5.4 },
      { Thang: '2026-02', Kenh_Ban: 'Cửa hàng', Danh_Muc: 'Gia dụng', Khu_Vuc: 'Hà Nội', So_Don: 210, Doanh_Thu: 315000000, Chi_Phi: 210000000, Ty_Le_Hoan: 0.8 },
      { Thang: '2026-03', Kenh_Ban: 'Shopee', Danh_Muc: 'Mỹ phẩm', Khu_Vuc: 'Hà Nội', So_Don: 530, Doanh_Thu: 495000000, Chi_Phi: 342000000, Ty_Le_Hoan: 4.1 },
      { Thang: '2026-03', Kenh_Ban: 'TikTok Shop', Danh_Muc: 'Thời trang', Khu_Vuc: 'TP.HCM', So_Don: 890, Doanh_Thu: 560000000, Chi_Phi: 425000000, Ty_Le_Hoan: 8.5 },
      { Thang: '2026-03', Kenh_Ban: 'Website', Danh_Muc: 'Điện tử', Khu_Vuc: 'TP.HCM', So_Don: 260, Doanh_Thu: 410000000, Chi_Phi: 270000000, Ty_Le_Hoan: 1.5 },
      { Thang: '2026-04', Kenh_Ban: 'Shopee', Danh_Muc: 'Gia dụng', Khu_Vuc: 'Đà Nẵng', So_Don: 380, Doanh_Thu: 440000000, Chi_Phi: 305000000, Ty_Le_Hoan: 2.7 },
      { Thang: '2026-04', Kenh_Ban: 'TikTok Shop', Danh_Muc: 'Mỹ phẩm', Khu_Vuc: 'Hà Nội', So_Don: 950, Doanh_Thu: 640000000, Chi_Phi: 445000000, Ty_Le_Hoan: 5.1 },
      { Thang: '2026-04', Kenh_Ban: 'Cửa hàng', Danh_Muc: 'Điện tử', Khu_Vuc: 'TP.HCM', So_Don: 295, Doanh_Thu: 520000000, Chi_Phi: 360000000, Ty_Le_Hoan: 0.9 },
      { Thang: '2026-05', Kenh_Ban: 'Shopee', Danh_Muc: 'Điện tử', Khu_Vuc: 'TP.HCM', So_Don: 510, Doanh_Thu: 710000000, Chi_Phi: 485000000, Ty_Le_Hoan: 2.8 },
      { Thang: '2026-05', Kenh_Ban: 'TikTok Shop', Danh_Muc: 'Thời trang', Khu_Vuc: 'Đà Nẵng', So_Don: null, Doanh_Thu: 430000000, Chi_Phi: 328000000, Ty_Le_Hoan: 9.4 },
      { Thang: '2026-05', Kenh_Ban: 'Website', Danh_Muc: 'Mỹ phẩm', Khu_Vuc: 'Hà Nội', So_Don: 315, Doanh_Thu: 365000000, Chi_Phi: 235000000, Ty_Le_Hoan: 1.6 },
      { Thang: '2026-06', Kenh_Ban: 'Shopee', Danh_Muc: 'Thời trang', Khu_Vuc: 'TP.HCM', So_Don: 640, Doanh_Thu: 690000000, Chi_Phi: 470000000, Ty_Le_Hoan: 4.2 },
      { Thang: '2026-06', Kenh_Ban: 'TikTok Shop', Danh_Muc: 'Mỹ phẩm', Khu_Vuc: 'TP.HCM', So_Don: 1120, Doanh_Thu: 820000000, Chi_Phi: 550000000, Ty_Le_Hoan: 4.9 },
      { Thang: '2026-06', Kenh_Ban: 'Cửa hàng', Danh_Muc: 'Gia dụng', Khu_Vuc: '', So_Don: 270, Doanh_Thu: 405000000, Chi_Phi: 265000000, Ty_Le_Hoan: 1.1 }
    ]
  },
  marketing_funnel: {
    id: 'marketing_funnel',
    name: 'Hiệu suất Marketing & Ads Q2',
    category: 'Marketing & Growth',
    description: 'Theo dõi ngân sách, lượt click, lead, đơn hàng chuyển đổi và ROAS trên Facebook, Google, TikTok, Email.',
    defaultContext: {
      companyName: 'AzureGrowth Agency',
      industry: 'Marketing & Truyền thông số',
      objective: 'Tối ưu ROAS & Phân bổ ngân sách quảng cáo',
      question: 'Kênh quảng cáo nào mang lại ROAS cao nhất và nên điều chuyển ngân sách từ kênh nào sang kênh nào trong Q3?'
    },
    rows: [
      { Tuan: 'Tuần 01', Kenh_Ads: 'Facebook Ads', Chien_Dich: 'Retargeting Q2', Ngan_Sach: 35000000, Luot_Click: 14200, Lead: 410, Chuyen_Doi: 86, Doanh_Thu: 129000000 },
      { Tuan: 'Tuần 01', Kenh_Ads: 'Google Search', Chien_Dich: 'Brand & High-Intent', Ngan_Sach: 28000000, Luot_Click: 8900, Lead: 365, Chuyen_Doi: 112, Doanh_Thu: 178000000 },
      { Tuan: 'Tuần 01', Kenh_Ads: 'TikTok Ads', Chien_Dich: 'Viral Video', Ngan_Sach: 24000000, Luot_Click: 22500, Lead: 290, Chuyen_Doi: 44, Doanh_Thu: 62000000 },
      { Tuan: 'Tuần 02', Kenh_Ads: 'Facebook Ads', Chien_Dich: 'Lookalike 2%', Ngan_Sach: 42000000, Luot_Click: 16800, Lead: 475, Chuyen_Doi: 95, Doanh_Thu: 144000000 },
      { Tuan: 'Tuần 02', Kenh_Ads: 'Google Search', Chien_Dich: 'Brand & High-Intent', Ngan_Sach: 30000000, Luot_Click: 9400, Lead: 390, Chuyen_Doi: 125, Doanh_Thu: 196000000 },
      { Tuan: 'Tuần 02', Kenh_Ads: 'Email Automation', Chien_Dich: 'Win-back CRM', Ngan_Sach: 5000000, Luot_Click: 3200, Lead: 195, Chuyen_Doi: 68, Doanh_Thu: 98000000 },
      { Tuan: 'Tuần 03', Kenh_Ads: 'Facebook Ads', Chien_Dich: 'Retargeting Q2', Ngan_Sach: 38000000, Luot_Click: 15100, Lead: 440, Chuyen_Doi: 98, Doanh_Thu: 151000000 },
      { Tuan: 'Tuần 03', Kenh_Ads: 'TikTok Ads', Chien_Dich: 'Livestream Boost', Ngan_Sach: 45000000, Luot_Click: 31200, Lead: 520, Chuyen_Doi: 105, Doanh_Thu: 168000000 },
      { Tuan: 'Tuần 03', Kenh_Ads: 'Google Search', Chien_Dich: 'Competitor KW', Ngan_Sach: 32000000, Luot_Click: 7800, Lead: 280, Chuyen_Doi: 84, Doanh_Thu: 132000000 },
      { Tuan: 'Tuần 04', Kenh_Ads: 'Facebook Ads', Chien_Dich: 'Flash Sale', Ngan_Sach: 50000000, Luot_Click: 21400, Lead: 610, Chuyen_Doi: 148, Doanh_Thu: 235000000 },
      { Tuan: 'Tuần 04', Kenh_Ads: 'Google Search', Chien_Dich: 'Brand & High-Intent', Ngan_Sach: 34000000, Luot_Click: 10600, Lead: 430, Chuyen_Doi: 140, Doanh_Thu: 224000000 },
      { Tuan: 'Tuần 04', Kenh_Ads: 'Email Automation', Chien_Dich: 'VIP Loyalty', Ngan_Sach: 6000000, Luot_Click: 4100, Lead: 250, Chuyen_Doi: 92, Doanh_Thu: 148000000 }
    ]
  },
  hr_kpi: {
    id: 'hr_kpi',
    name: 'KPI & Năng suất Nhân sự 2026',
    category: 'Nhân sự & Vận hành',
    description: 'Dữ liệu đánh giá hiệu suất theo phòng ban, cấp bậc, số dự án hoàn thành, điểm KPI và giờ làm thêm.',
    defaultContext: {
      companyName: 'Tập đoàn Công nghệ NovaTech',
      industry: 'Nhân sự & Vận hành',
      objective: 'Đánh giá hiệu suất phòng ban & cân bằng tải công việc',
      question: 'Phòng ban nào đang có hiệu suất KPI cao nhất và bộ phận nào có nguy cơ quá tải giờ làm thêm (OT)?'
    },
    rows: [
      { Ma_NV: 'NV001', Phong_Ban: 'Kỹ thuật', Cap_Bac: 'Senior', Du_An: 7, Diem_KPI: 94, Gio_OT: 18, Thu_Nhap: 34000000 },
      { Ma_NV: 'NV002', Phong_Ban: 'Kỹ thuật', Cap_Bac: 'Middle', Du_An: 5, Diem_KPI: 86, Gio_OT: 24, Thu_Nhap: 24000000 },
      { Ma_NV: 'NV003', Phong_Ban: 'Kinh doanh', Cap_Bac: 'Senior', Du_An: 9, Diem_KPI: 97, Gio_OT: 12, Thu_Nhap: 38000000 },
      { Ma_NV: 'NV004', Phong_Ban: 'Kinh doanh', Cap_Bac: 'Junior', Du_An: 4, Diem_KPI: 74, Gio_OT: 8, Thu_Nhap: 14500000 },
      { Ma_NV: 'NV005', Phong_Ban: 'Marketing', Cap_Bac: 'Middle', Du_An: 6, Diem_KPI: 88, Gio_OT: 15, Thu_Nhap: 21000000 },
      { Ma_NV: 'NV006', Phong_Ban: 'Marketing', Cap_Bac: 'Senior', Du_An: 8, Diem_KPI: 92, Gio_OT: 10, Thu_Nhap: 31000000 },
      { Ma_NV: 'NV007', Phong_Ban: 'Vận hành', Cap_Bac: 'Middle', Du_An: 5, Diem_KPI: 81, Gio_OT: 32, Thu_Nhap: 18500000 },
      { Ma_NV: 'NV008', Phong_Ban: 'Vận hành', Cap_Bac: 'Junior', Du_An: 3, Diem_KPI: 69, Gio_OT: 29, Thu_Nhap: 13000000 },
      { Ma_NV: 'NV009', Phong_Ban: 'Kỹ thuật', Cap_Bac: 'Lead', Du_An: 10, Diem_KPI: 98, Gio_OT: 14, Thu_Nhap: 46000000 },
      { Ma_NV: 'NV010', Phong_Ban: 'Kinh doanh', Cap_Bac: 'Middle', Du_An: 7, Diem_KPI: 89, Gio_OT: 11, Thu_Nhap: 26500000 }
    ]
  }
};

function formatNumberVN(val, isCurrency = false) {
  if (val === null || val === undefined || Number.isNaN(val)) return '—';
  const num = Number(val);
  if (isCurrency || Math.abs(num) >= 1000000) {
    if (Math.abs(num) >= 1e9) return (num / 1e9).toFixed(2) + ' Tỷ';
    if (Math.abs(num) >= 1e6) return (num / 1e6).toFixed(1) + ' Tr';
  }
  return Number.isInteger(num)
    ? num.toLocaleString('vi-VN')
    : num.toLocaleString('vi-VN', { maximumFractionDigits: 2 });
}

function parseNumeric(val) {
  if (typeof val === 'number') return Number.isFinite(val) ? val : null;
  if (val === null || val === undefined) return null;
  const s = String(val).trim();
  if (!s) return null;
  const cleaned = s.replace(/[₫đ$€%\s]/g, '').replace(/,(?=\d{3}(\D|$))/g, '');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function parseDelimitedText(text) {
  const lines = text.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length < 2) throw new Error('Dữ liệu cần ít nhất 1 dòng tiêu đề và 1 dòng dữ liệu.');
  const firstLine = lines[0];
  const delimiter = firstLine.includes('\t') ? '\t' : (firstLine.includes(';') && !firstLine.includes(',') ? ';' : ',');

  const splitRow = (line) => {
    const out = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') inQuotes = !inQuotes;
      else if (ch === delimiter && !inQuotes) {
        out.push(cur.trim());
        cur = '';
      } else {
        cur += ch;
      }
    }
    out.push(cur.trim());
    return out;
  };

  const headers = splitRow(lines[0]).map((h, idx) => h || `Cot_${idx + 1}`);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = splitRow(lines[i]);
    const obj = {};
    headers.forEach((h, idx) => {
      const raw = cells[idx] !== undefined ? cells[idx] : '';
      const num = parseNumeric(raw);
      obj[h] = (raw !== '' && num !== null && !/^0\d+$/.test(raw)) ? num : raw;
    });
    rows.push(obj);
  }
  return rows;
}

async function parseUploadedFile(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  if (ext === 'json') {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const rows = Array.isArray(parsed) ? parsed : (parsed.data || parsed.rows || [parsed]);
    if (!rows.length) throw new Error('File JSON không chứa mảng dữ liệu hợp lệ.');
    return rows;
  }
  if (ext === 'csv' || ext === 'tsv' || ext === 'txt') {
    const text = await file.text();
    return parseDelimitedText(text);
  }
  if (ext === 'xlsx' || ext === 'xls') {
    if (typeof XLSX === 'undefined') {
      throw new Error('Thư viện đọc Excel (SheetJS) chưa sẵn sàng. Vui lòng kiểm tra kết nối mạng.');
    }
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: 'array' });
    const firstSheet = wb.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(wb.Sheets[firstSheet], { defval: '' });
    if (!rows.length) throw new Error('Sheet đầu tiên trong file Excel không có dữ liệu.');
    return rows;
  }
  throw new Error(`Định dạng .${ext} chưa được hỗ trợ. Hãy dùng .xlsx, .csv, hoặc .json.`);
}

function parseAnalysisRevision(rawRows, revisionNote) {
  const note = (revisionNote || '').trim();
  const result = {
    rows: rawRows.map(r => ({ ...r })),
    primaryMetricName: null,
    groupDimName: null,
    appliedChanges: []
  };
  if (!note || !rawRows.length) return result;

  const cols = Object.keys(rawRows[0] || {});
  const clauses = note.split(/[;\n]+/).map(s => s.trim()).filter(Boolean);

  clauses.forEach(clause => {
    const cLower = clause.toLowerCase();

    // A. Drop column: "xóa cột X" / "bỏ cột X"
    const dropColMatch = clause.match(/^(?:xóa|bỏ|loại|loại bỏ)\s+cột\s+["']?(.+?)["']?$/i);
    if (dropColMatch) {
      const targetCol = cols.find(c => c.toLowerCase() === dropColMatch[1].trim().toLowerCase());
      if (targetCol) {
        result.rows.forEach(r => delete r[targetCol]);
        result.appliedChanges.push(`Đã xóa cột "${targetCol}" khỏi phân tích.`);
        return;
      }
    }

    // B. Exclude rows by value/keyword: "xóa X", "bỏ X", "loại X", "trừ X"
    const exclMatch = clause.match(/^(?:xóa|bỏ|loại|loại bỏ|trừ|không tính)\s+(?:dòng\s+(?:chứa|có)\s+)?["']?(.+?)["']?$/i);
    if (exclMatch) {
      const kw = exclMatch[1].trim().toLowerCase();
      const before = result.rows.length;
      const filtered = result.rows.filter(r => !Object.values(r).some(v => String(v ?? '').toLowerCase().includes(kw)));
      if (filtered.length > 0 && filtered.length < before) {
        result.rows = filtered;
        result.appliedChanges.push(`Đã loại bỏ ${before - filtered.length} dòng chứa "${exclMatch[1].trim()}" (còn ${filtered.length} dòng).`);
        return;
      }
    }

    // C. Focus / Filter rows by value/keyword: "chỉ X", "tập trung X", "lọc X", "riêng X"
    const focusMatch = clause.match(/^(?:chỉ|chỉ phân tích|chỉ xem|tập trung(?: vào)?|riêng|lọc(?: theo)?)\s+["']?(.+?)["']?$/i);
    if (focusMatch) {
      const kw = focusMatch[1].trim().toLowerCase();
      // Check if kw is a column name first (e.g. "phân tích theo City")
      const matchedCol = cols.find(c => c.toLowerCase() === kw);
      if (!matchedCol) {
        const filtered = result.rows.filter(r => Object.values(r).some(v => String(v ?? '').toLowerCase().includes(kw)));
        if (filtered.length > 0 && filtered.length < result.rows.length) {
          result.rows = filtered;
          result.appliedChanges.push(`Đã lọc tập trung vào "${focusMatch[1].trim()}": ${filtered.length} dòng.`);
          return;
        }
      }
    }

    // Fallback: inline exclude/focus anywhere in sentence
    const isExclude = /(?:xóa|bỏ|loại|loại bỏ|trừ|không tính)\s+/i.test(cLower);
    const isFocus = /(?:chỉ|tập trung|riêng|lọc|xem riêng)\s+/i.test(cLower);
    if (isExclude || isFocus) {
      const allVals = new Set();
      cols.forEach(c => result.rows.forEach(r => {
        const v = String(r[c] ?? '').trim();
        if (v.length >= 2) allVals.add(v);
      }));
      const hitVal = Array.from(allVals).sort((a, b) => b.length - a.length).find(v => cLower.includes(v.toLowerCase()));
      if (hitVal) {
        const before = result.rows.length;
        const nextRows = isExclude
          ? result.rows.filter(r => !Object.values(r).some(v => String(v ?? '').trim().toLowerCase() === hitVal.toLowerCase()))
          : result.rows.filter(r => Object.values(r).some(v => String(v ?? '').trim().toLowerCase() === hitVal.toLowerCase()));
        if (nextRows.length > 0 && nextRows.length < before) {
          result.rows = nextRows;
          result.appliedChanges.push(isExclude
            ? `Đã loại bỏ "${hitVal}": còn ${nextRows.length}/${before} dòng.`
            : `Đã lọc tập trung vào "${hitVal}": ${nextRows.length} dòng.`);
        }
      }
    }
  });

  // 2. Detect explicit column overrides (exact column name or Vietnamese/English alias)
  const noteLower = note.toLowerCase();
  const activeCols = Object.keys(result.rows[0] || {});
  const colAliases = {
    'tỷ lệ hoàn': /ty_le_hoan|hoan|return/i,
    'hoàn hàng': /ty_le_hoan|hoan|return/i,
    'chi phí': /chi_phi|cost|ngan_sach/i,
    'ngân sách': /ngan_sach|budget|chi_phi/i,
    'số đơn': /so_don|order_count|orders/i,
    'doanh thu': /doanh_thu|revenue|sales|amount|total/i,
    'lợi nhuận': /loi_nhuan|profit|doanh_thu/i,
    'giờ ot': /gio_ot|ot/i,
    'làm thêm': /gio_ot|ot/i,
    'kpi': /diem_kpi|kpi/i,
    'thu nhập': /thu_nhap|luong|salary/i,
    'khu vực': /khu_vuc|region|area/i,
    'thành phố': /city|thanh_pho/i,
    'phân khúc': /segment|phan_khuc/i,
    'danh mục': /danh_muc|category/i,
    'kênh': /kenh|channel/i,
    'phòng ban': /phong_ban|department/i,
    'cấp bậc': /cap_bac|level/i,
    'chiến dịch': /chien_dich|campaign/i
  };

  activeCols.forEach(c => {
    if (noteLower.includes(c.toLowerCase())) {
      const sampleNums = result.rows.map(r => parseNumeric(r[c])).filter(n => n !== null);
      if (sampleNums.length >= result.rows.length * 0.7) {
        result.primaryMetricName = c;
      } else {
        result.groupDimName = c;
      }
    }
  });

  if (!result.primaryMetricName || !result.groupDimName) {
    for (const [alias, regex] of Object.entries(colAliases)) {
      if (noteLower.includes(alias)) {
        const hit = activeCols.find(c => regex.test(c));
        if (hit) {
          const sampleNums = result.rows.map(r => parseNumeric(r[hit])).filter(n => n !== null);
          if (sampleNums.length >= result.rows.length * 0.7 && !result.primaryMetricName) {
            result.primaryMetricName = hit;
          } else if (sampleNums.length < result.rows.length * 0.7 && !result.groupDimName) {
            result.groupDimName = hit;
          }
        }
      }
    }
  }

  if (result.primaryMetricName) {
    result.appliedChanges.push(`Đã chuyển Chỉ số chính (Y1) sang "${result.primaryMetricName}".`);
  }
  if (result.groupDimName) {
    result.appliedChanges.push(`Đã chuyển Trục phân nhóm (X) sang "${result.groupDimName}".`);
  }

  return result;
}

function analyzeDataset(rawRows, datasetName = 'Dataset', businessContext = {}) {
  // First align default axes with Step 1 Business Context (objective + question), then apply any Step 2 human revision
  const ctxQuery = `${businessContext?.objective || ''} ${businessContext?.question || ''}`.trim();
  const ctxHints = ctxQuery ? parseAnalysisRevision(rawRows, ctxQuery) : { primaryMetricName: null, groupDimName: null };
  const revision = parseAnalysisRevision(rawRows, businessContext?.analysisRevisionNote);
  const rows = revision.rows;
  const totalRows = rows.length;
  const colSet = new Set();
  rows.forEach(r => Object.keys(r).forEach(k => colSet.add(k)));
  const columns = Array.from(colSet);

  const seen = new Set();
  let duplicateCount = 0;
  rows.forEach(r => {
    const sig = JSON.stringify(r);
    if (seen.has(sig)) duplicateCount++;
    else seen.add(sig);
  });

  const colProfiles = [];
  const anomalyRecords = [];
  let totalMissingCells = 0;
  let totalOutliers = 0;

  columns.forEach(col => {
    let missing = 0;
    const rawValues = [];
    const numValues = [];

    rows.forEach(r => {
      const v = r[col];
      if (v === null || v === undefined || String(v).trim() === '') {
        missing++;
      } else {
        rawValues.push(v);
        const n = parseNumeric(v);
        if (n !== null && !/^0\d{3,}$/.test(String(v).trim())) {
          numValues.push(n);
        }
      }
    });

    totalMissingCells += missing;
    const nonNull = rawValues.length;
    const isNumeric = nonNull > 0 && (numValues.length / nonNull) >= 0.75;
    const uniqueCount = new Set(rawValues.map(v => String(v).trim())).size;

    const profile = {
      name: col,
      type: isNumeric ? 'number' : 'category',
      missing,
      missingPct: totalRows ? ((missing / totalRows) * 100) : 0,
      uniqueCount,
      outliers: 0,
      sum: null,
      mean: null,
      median: null,
      stdDev: null,
      min: null,
      max: null,
      topCategory: null
    };

    if (isNumeric && numValues.length > 0) {
      const sorted = [...numValues].sort((a, b) => a - b);
      const sum = sorted.reduce((a, b) => a + b, 0);
      const mean = sum / sorted.length;
      const variance = sorted.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / sorted.length;
      const stdDev = Math.sqrt(variance);
      const mid = Math.floor(sorted.length / 2);
      const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

      const q1 = sorted[Math.floor(sorted.length * 0.25)];
      const q3 = sorted[Math.floor(sorted.length * 0.75)];
      const iqr = q3 - q1;
      const lowFence = q1 - 1.5 * iqr;
      const highFence = q3 + 1.5 * iqr;

      let outlierCount = 0;
      rows.forEach((r, idx) => {
        const n = parseNumeric(r[col]);
        if (n !== null && iqr > 0 && (n < lowFence || n > highFence)) {
          outlierCount++;
          anomalyRecords.push({
            rowIndex: idx + 1,
            column: col,
            value: n,
            direction: n > highFence ? 'Cao bất thường' : 'Thấp bất thường',
            contextLabel: Object.values(r).slice(0, 3).join(' · ')
          });
        }
      });

      totalOutliers += outlierCount;
      profile.sum = sum;
      profile.mean = mean;
      profile.median = median;
      profile.stdDev = stdDev;
      profile.min = sorted[0];
      profile.max = sorted[sorted.length - 1];
      profile.outliers = outlierCount;
    } else if (rawValues.length > 0) {
      const freq = {};
      rawValues.forEach(v => {
        const k = String(v).trim();
        freq[k] = (freq[k] || 0) + 1;
      });
      const top = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];
      profile.topCategory = top ? { label: top[0], count: top[1] } : null;
    }

    colProfiles.push(profile);
  });

  const totalCells = totalRows * columns.length;
  const completeness = totalCells ? Math.max(0, 100 - (totalMissingCells / totalCells) * 100) : 100;
  const dupPenalty = totalRows ? (duplicateCount / totalRows) * 20 : 0;
  const healthScore = Math.round(Math.max(40, Math.min(100, completeness - dupPenalty)));

  const numericCols = colProfiles.filter(c => c.type === 'number');
  const categoryCols = colProfiles.filter(c => c.type === 'category');

  const primaryMetric =
    (revision.primaryMetricName && numericCols.find(c => c.name === revision.primaryMetricName)) ||
    (ctxHints.primaryMetricName && numericCols.find(c => c.name === ctxHints.primaryMetricName)) ||
    numericCols.find(c => /doanh_thu|revenue|sales|profit|loi_nhuan|thu_nhap|kpi|score|amount/i.test(c.name)) ||
    numericCols[0] ||
    null;

  const secondaryMetric =
    numericCols.find(c => c !== primaryMetric && /chi_phi|cost|ngan_sach|so_don|lead|chuyen_doi|du_an|gio_ot/i.test(c.name)) ||
    numericCols.find(c => c !== primaryMetric) ||
    null;

  const riskMetric =
    numericCols.find(c => /hoan|return|loi|error|ot|gio_ot|cost|chi_phi/i.test(c.name)) ||
    null;

  const timeDim =
    categoryCols.find(c => /thang|tuan|ngay|date|month|week|time|nam|quy/i.test(c.name)) ||
    categoryCols[0] ||
    null;

  const groupDim =
    (revision.groupDimName && categoryCols.find(c => c.name === revision.groupDimName)) ||
    (ctxHints.groupDimName && categoryCols.find(c => c.name === ctxHints.groupDimName)) ||
    categoryCols.find(c => c !== timeDim && c.uniqueCount <= 15 && c.uniqueCount >= 2) ||
    categoryCols.find(c => c !== timeDim && c.uniqueCount >= 2) ||
    timeDim ||
    null;

  const secondaryDim =
    categoryCols.find(c => c !== timeDim && c !== groupDim && c.uniqueCount <= 15) ||
    null;

  // Multi-dimensional group aggregation (Primary + Secondary + Count + Efficiency)
  const aggregateDimension = (dimName) => {
    if (!dimName || !primaryMetric) return [];
    const map = {};
    rows.forEach(r => {
      const key = String(r[dimName] ?? '').trim() || 'Chưa phân loại';
      if (!map[key]) {
        map[key] = { label: key, count: 0, primarySum: 0, secondarySum: 0, riskSum: 0 };
      }
      map[key].count++;
      map[key].primarySum += parseNumeric(r[primaryMetric.name]) || 0;
      if (secondaryMetric) map[key].secondarySum += parseNumeric(r[secondaryMetric.name]) || 0;
      if (riskMetric) map[key].riskSum += parseNumeric(r[riskMetric.name]) || 0;
    });
    const list = Object.values(map).map(item => {
      const primaryAvg = item.primarySum / item.count;
      const secondaryAvg = secondaryMetric ? item.secondarySum / item.count : 0;
      const netDelta = secondaryMetric ? item.primarySum - item.secondarySum : item.primarySum;
      const marginPct = (secondaryMetric && item.primarySum > 0)
        ? ((item.primarySum - item.secondarySum) / item.primarySum) * 100
        : null;
      return {
        ...item,
        primaryAvg,
        secondaryAvg,
        netDelta,
        marginPct,
        riskAvg: riskMetric ? item.riskSum / item.count : null
      };
    });
    return list.sort((a, b) => b.primarySum - a.primarySum);
  };

  const trendSeries = timeDim && primaryMetric
    ? (() => {
        const map = {};
        rows.forEach(r => {
          const key = String(r[timeDim.name] ?? '').trim() || 'Chưa phân loại';
          if (!map[key]) map[key] = { label: key, primary: 0, secondary: 0 };
          map[key].primary += parseNumeric(r[primaryMetric.name]) || 0;
          if (secondaryMetric) map[key].secondary += parseNumeric(r[secondaryMetric.name]) || 0;
        });
        return Object.values(map);
      })()
    : [];

  const categoryBreakdown = groupDim ? aggregateDimension(groupDim.name) : [];
  const secondaryBreakdown = secondaryDim ? aggregateDimension(secondaryDim.name) : [];

  // Pareto concentration
  const totalPrimary = categoryBreakdown.reduce((s, x) => s + x.primarySum, 0) || 1;
  const topNCount = Math.max(1, Math.ceil(categoryBreakdown.length * 0.3));
  const topNShare = categoryBreakdown.slice(0, topNCount).reduce((s, x) => s + x.primarySum, 0) / totalPrimary * 100;

  // Alerts
  const alerts = [];
  if (totalMissingCells > 0) {
    alerts.push({ level: 'warning', text: `Phát hiện ${totalMissingCells} ô thiếu dữ liệu — nên chạy Làm sạch tự động.` });
  } else {
    alerts.push({ level: 'success', text: '100% ô dữ liệu đầy đủ, không có giá trị trống.' });
  }
  if (duplicateCount > 0) {
    alerts.push({ level: 'warning', text: `Có ${duplicateCount} dòng trùng lặp hoàn toàn.` });
  }
  if (anomalyRecords.length > 0) {
    alerts.push({ level: 'info', text: `Phát hiện ${anomalyRecords.length} điểm ngoại lai (Outliers) cần rà soát.` });
  }

  // Executive Synthesis & Decision Matrix
  const executiveReport = buildExecutiveReport({
    datasetName,
    businessContext,
    totalRows,
    colProfiles,
    primaryMetric,
    secondaryMetric,
    riskMetric,
    timeDim,
    groupDim,
    secondaryDim,
    trendSeries,
    categoryBreakdown,
    secondaryBreakdown,
    topNCount,
    topNShare,
    anomalyRecords,
    totalMissingCells,
    healthScore
  });

  return {
    datasetName,
    businessContext,
    rows,
    columns,
    totalRows,
    totalCols: columns.length,
    totalMissingCells,
    duplicateCount,
    totalOutliers,
    anomalyRecords,
    healthScore,
    colProfiles,
    numericCols,
    categoryCols,
    primaryMetric,
    secondaryMetric,
    riskMetric,
    timeDim,
    groupDim,
    secondaryDim,
    trendSeries,
    categoryBreakdown,
    secondaryBreakdown,
    topNShare,
    alerts,
    revisionApplied: revision.appliedChanges,
    insights: executiveReport.insights,
    executiveReport
  };
}

function buildExecutiveReport(ctx) {
  const {
    datasetName, businessContext, totalRows, primaryMetric, secondaryMetric, riskMetric,
    groupDim, secondaryDim, trendSeries, categoryBreakdown, secondaryBreakdown,
    topNCount, topNShare, anomalyRecords, totalMissingCells, healthScore
  } = ctx;

  const company = businessContext?.companyName || 'Doanh nghiệp';
  const industry = businessContext?.industry || 'Đa ngành';
  const objective = businessContext?.objective || 'Tối ưu hiệu suất vận hành';
  const question = businessContext?.question || 'Đánh giá tổng thể hiệu suất và rủi ro.';
  const revisionNote = (businessContext?.analysisRevisionNote || '').trim();
  const overallMargin = (primaryMetric && secondaryMetric && primaryMetric.sum > 0)
    ? ((primaryMetric.sum - secondaryMetric.sum) / primaryMetric.sum) * 100
    : 20;

  // 1. Direct Answer to Manager's Question
  const topGroup = categoryBreakdown[0];
  const bottomGroup = categoryBreakdown[categoryBreakdown.length - 1];
  let growthStr = '';
  if (trendSeries.length >= 2) {
    const first = trendSeries[0].primary;
    const last = trendSeries[trendSeries.length - 1].primary;
    const pct = first !== 0 ? (((last - first) / Math.abs(first)) * 100).toFixed(1) : '0';
    growthStr = `Xu hướng ${primaryMetric?.name} biến động ${Number(pct) >= 0 ? '+' : ''}${pct}% từ "${trendSeries[0].label}" đến "${trendSeries[trendSeries.length - 1].label}".`;
  }

  let efficiencyAnswer = '';
  if (primaryMetric && secondaryMetric && categoryBreakdown.length) {
    const bestMarginItem = [...categoryBreakdown].sort((a, b) => (b.marginPct ?? -999) - (a.marginPct ?? -999))[0];
    efficiencyAnswer = `Xét về hiệu suất giữa ${primaryMetric.name} và ${secondaryMetric.name}, nhóm "${bestMarginItem.label}" đạt biên chênh lệch cao nhất (${bestMarginItem.marginPct?.toFixed(1)}%).`;
  }

  let revisionBullet = '';
  let revisionInsight = null;
  if (revisionNote) {
    const noteLower = revisionNote.toLowerCase();
    const matchedGroup = [...categoryBreakdown, ...secondaryBreakdown].find(g => noteLower.includes(g.label.toLowerCase()));
    const matchedCol = ctx.colProfiles?.find(c => noteLower.includes(c.name.toLowerCase()));

    let focusDetail = '';
    if (matchedGroup) {
      focusDetail = `Nhóm "${matchedGroup.label}" ghi nhận ${matchedGroup.count} bản ghi, tổng ${primaryMetric?.name} đạt ${formatNumberVN(matchedGroup.primarySum, true)}${matchedGroup.marginPct !== null ? ` (Biên hiệu quả: ${matchedGroup.marginPct.toFixed(1)}%)` : ''}${matchedGroup.riskAvg !== null ? `, mức rủi ro TB: ${formatNumberVN(matchedGroup.riskAvg)}` : ''}.`;
    } else if (matchedCol && matchedCol.type === 'number') {
      focusDetail = `Chỉ số "${matchedCol.name}" có tổng ${formatNumberVN(matchedCol.sum, true)}, trung bình ${formatNumberVN(matchedCol.mean, true)} (Min: ${formatNumberVN(matchedCol.min, true)} · Max: ${formatNumberVN(matchedCol.max, true)}).`;
    } else {
      focusDetail = `Đã lồng ghép chỉ đạo trọng tâm của nhà quản trị vào toàn bộ Ma trận Quyết định và kế hoạch hành động.`;
    }

    revisionBullet = `• **Điều chỉnh theo nhận xét kiểm duyệt ("${revisionNote}"):** ${focusDetail}`;
    revisionInsight = {
      priority: 'Cao',
      tag: 'Trọng tâm theo Nhận xét Kiểm duyệt',
      data: `Yêu cầu điều chỉnh: "${revisionNote}". ${focusDetail}`,
      insight: 'Phân tích đã được hiệu chỉnh lại góc nhìn để bám sát mối quan tâm trực tiếp của nhà quản trị.',
      action: matchedGroup
        ? `Lập phương án hành động riêng cho "${matchedGroup.label}" và theo dõi biến động hàng tuần.`
        : `Ưu tiên triển khai các đề xuất liên quan trực tiếp đến chỉ đạo "${revisionNote}".`,
      kpi: 'Đo lường chuyển biến thực tế theo đúng hạng mục vừa hiệu chỉnh trong kỳ tới.',
      owner: 'Ban Điều hành & Data Analyst'
    };
  }

  const directAnswer = [
    `Dựa trên bối cảnh của **${company}** (${industry}) với mục tiêu **${objective}**, phân tích ${totalRows} bản ghi từ "${datasetName}" cho thấy:`,
    topGroup ? `• **Động lực chính (${groupDim?.name}):** "${topGroup.label}" dẫn đầu với tổng ${primaryMetric?.name} đạt ${formatNumberVN(topGroup.primarySum, true)}. Top ${topNCount} nhóm đầu chiếm tới **${topNShare.toFixed(1)}%** tổng giá trị (hiệu ứng tập trung Pareto).` : '',
    efficiencyAnswer ? `• **Hiệu quả vận hành:** ${efficiencyAnswer}` : '',
    growthStr ? `• **Động lượng thời gian:** ${growthStr}` : '',
    anomalyRecords.length ? `• **Điểm cần lưu ý:** Có ${anomalyRecords.length} điểm dữ liệu ngoại lai và ${totalMissingCells} ô thiếu cần xử lý để tránh sai lệch quyết định.` : '',
    revisionBullet
  ].filter(Boolean).join('\n');

  // 2. Decision Matrix (Scale / Optimize / Mitigate)
  const decisionMatrix = {
    scale: [],
    optimize: [],
    mitigate: []
  };

  if (categoryBreakdown.length >= 2) {
    const top2 = categoryBreakdown.slice(0, 2);
    top2.forEach(item => {
      decisionMatrix.scale.push({
        entity: `${groupDim?.name}: ${item.label}`,
        metric: `${formatNumberVN(item.primarySum, true)} (${item.count} bản ghi)`,
        reason: item.marginPct !== null
          ? `Quy mô lớn và giữ biên hiệu quả ${item.marginPct.toFixed(1)}% (TB toàn bộ: ${overallMargin.toFixed(1)}%).`
          : `Đóng góp tỷ trọng cao nhất trong tập dữ liệu.`
      });
    });

    const midOrLagging = categoryBreakdown.slice(2);
    midOrLagging.forEach(item => {
      if (item.marginPct !== null && item.marginPct < overallMargin) {
        decisionMatrix.mitigate.push({
          entity: `${groupDim?.name}: ${item.label}`,
          metric: `Biên ${item.marginPct.toFixed(1)}% (< TB ${overallMargin.toFixed(1)}%)`,
          reason: `Chi phí/nguồn lực (${secondaryMetric?.name}) đang cao hơn mức trung bình so với đầu ra (${primaryMetric?.name}).`
        });
      } else {
        decisionMatrix.optimize.push({
          entity: `${groupDim?.name}: ${item.label}`,
          metric: `${formatNumberVN(item.primarySum, true)}`,
          reason: `Có tiềm năng tăng trưởng nhưng quy mô còn thấp hơn nhóm dẫn đầu.`
        });
      }
    });
  }

  if (riskMetric && categoryBreakdown.length) {
    const highRisk = [...categoryBreakdown].sort((a, b) => (b.riskAvg || 0) - (a.riskAvg || 0))[0];
    if (highRisk && highRisk.riskAvg > 0) {
      decisionMatrix.mitigate.push({
        entity: `Rủi ro ${riskMetric.name} tại "${highRisk.label}"`,
        metric: `Trung bình ${formatNumberVN(highRisk.riskAvg)}`,
        reason: `Mức ${riskMetric.name} cao nhất trong các nhóm, ảnh hưởng trực tiếp đến mục tiêu ${objective}.`
      });
    }
  }

  // 3. Structured Insights (DATA -> INSIGHT -> ACTION -> KPI)
  const insights = [];
  if (revisionInsight) insights.push(revisionInsight);
  if (topGroup && primaryMetric) {
    insights.push({
      priority: 'Cao',
      tag: 'Phân tích Tập trung (Pareto)',
      data: `Top ${topNCount} ${groupDim?.name} ("${topGroup.label}"...) chiếm ${topNShare.toFixed(1)}% tổng ${primaryMetric.name} (${formatNumberVN(topGroup.primarySum, true)}).`,
      insight: `Doanh nghiệp đang phụ thuộc lớn vào nhóm dẫn đầu. Nếu nhóm này biến động, kết quả chung của ${company} sẽ bị ảnh hưởng mạnh.`,
      action: `Ưu tiên bảo vệ & mở rộng nguồn lực cho "${topGroup.label}", đồng thời xây kế hoạch nâng tỷ trọng nhóm đứng sau ("${bottomGroup?.label || 'nhóm phụ'}").`,
      kpi: `Tăng thêm 15% ${primaryMetric.name} ở nhóm top và giảm độ tập trung xuống dưới 65%.`,
      owner: 'Ban Giám đốc & Kinh doanh'
    });
  }

  if (primaryMetric && secondaryMetric) {
    const bestGroup = [...categoryBreakdown].sort((a, b) => (b.marginPct ?? -999) - (a.marginPct ?? -999))[0];
    const worstGroup = [...categoryBreakdown].sort((a, b) => (a.marginPct ?? 999) - (b.marginPct ?? 999))[0];
    insights.push({
      priority: 'Cao',
      tag: 'Hiệu suất Kép & Biên chênh lệch',
      data: `Tổng ${primaryMetric.name} đạt ${formatNumberVN(primaryMetric.sum, true)} vs ${secondaryMetric.name} là ${formatNumberVN(secondaryMetric.sum, true)} (Biên trung bình: ${overallMargin.toFixed(1)}%).`,
      insight: bestGroup && worstGroup
        ? `Nhóm "${bestGroup.label}" đạt biên cao nhất (${bestGroup.marginPct?.toFixed(1)}%), trong khi "${worstGroup.label}" chỉ đạt ${worstGroup.marginPct?.toFixed(1)}%.`
        : `Chênh lệch giữa đầu ra và chi phí đạt ${overallMargin.toFixed(1)}%.`,
      action: worstGroup
        ? `Rà soát cấu trúc ${secondaryMetric.name} tại "${worstGroup.label}" và nhân bản cách vận hành tối ưu từ "${bestGroup?.label}".`
        : `Theo dõi sát tỷ lệ giữa ${primaryMetric.name} và ${secondaryMetric.name} theo từng kỳ.`,
      kpi: `Nâng biên hiệu quả của nhóm thấp nhất lên tối thiểu bằng mức trung bình (${overallMargin.toFixed(1)}%).`,
      owner: 'Tài chính & Vận hành'
    });
  }

  if (secondaryBreakdown.length >= 2) {
    const topSec = secondaryBreakdown[0];
    const lowSec = secondaryBreakdown[secondaryBreakdown.length - 1];
    insights.push({
      priority: 'Trung bình',
      tag: `Phân tích Chiều sâu (${secondaryDim?.name})`,
      data: `Theo chiều ${secondaryDim?.name}, "${topSec.label}" đạt ${formatNumberVN(topSec.primarySum, true)}, gấp ${(topSec.primarySum / (lowSec.primarySum || 1)).toFixed(1)} lần nhóm "${lowSec.label}".`,
      insight: `Sự chênh lệch lớn giữa các ${secondaryDim?.name} cho thấy cơ hội tối ưu phân bổ danh mục/khu vực.`,
      action: `Đánh giá nguyên nhân "${lowSec.label}" hoạt động kém hiệu quả để điều chỉnh danh mục hoặc chính sách giá.`,
      kpi: `Thu hẹp khoảng cách hiệu suất giữa nhóm cao nhất và thấp nhất xuống dưới 2.5x.`,
      owner: 'Quản lý Danh mục / Khu vực'
    });
  }

  if (totalMissingCells > 0 || anomalyRecords.length > 0) {
    insights.push({
      priority: 'Cao',
      tag: 'Quản trị Rủi ro & Dữ liệu',
      data: `Health Score: ${healthScore}/100 (${totalMissingCells} ô thiếu, ${anomalyRecords.length} điểm ngoại lai IQR).`,
      insight: 'Các điểm ngoại lai hoặc ô trống có thể là lỗi nhập liệu hoặc sự kiện đột biến cần kiểm chứng trước khi chốt báo cáo quản trị.',
      action: 'Kiểm tra bảng Điểm bất thường trong tab Báo cáo Quản trị và chạy Làm sạch 1-Click.',
      kpi: 'Đưa Health Score lên >= 95/100 trước khi xuất báo cáo chính thức.',
      owner: 'Data / Admin'
    });
  }

  // 4. Deep-Dive Analysis of the 4 Dashboard Charts + Recommendations
  const dashboardDeepDive = [];
  if (trendSeries.length >= 2 && primaryMetric) {
    const sortedPeriods = [...trendSeries].sort((a, b) => b.primary - a.primary);
    const peak = sortedPeriods[0];
    const trough = sortedPeriods[sortedPeriods.length - 1];
    const first = trendSeries[0].primary;
    const last = trendSeries[trendSeries.length - 1].primary;
    const deltaPct = first !== 0 ? (((last - first) / Math.abs(first)) * 100).toFixed(1) : '0';
    const avgPeriod = trendSeries.reduce((s, p) => s + p.primary, 0) / trendSeries.length;
    const volatilityPct = avgPeriod > 0 ? (((peak.primary - trough.primary) / avgPeriod) * 100).toFixed(0) : '0';

    dashboardDeepDive.push({
      chart: '1. Biểu đồ Xu hướng (Trend Analysis)',
      metricBadge: `Biến động ${Number(deltaPct) >= 0 ? '+' : ''}${deltaPct}% · Biên độ dao động ${volatilityPct}%`,
      finding: `Giá trị ${primaryMetric.name} đạt đỉnh tại "${peak.label}" (${formatNumberVN(peak.primary, true)}) và chạm đáy tại "${trough.label}" (${formatNumberVN(trough.primary, true)}). Trung bình mỗi kỳ đạt ${formatNumberVN(avgPeriod, true)}.`,
      impact: Number(volatilityPct) > 50
        ? `Biên độ dao động giữa đỉnh và đáy khá lớn (${volatilityPct}%), cho thấy tính mùa vụ hoặc sự thiếu ổn định trong vận hành.`
        : `Nhịp độ biến động tương đối ổn định qua các kỳ, thuận lợi cho việc lập kế hoạch dự báo.`,
      recommendation: Number(deltaPct) >= 0
        ? `Duy trì nhịp tăng trưởng và giải mã yếu tố giúp "${peak.label}" bứt phá để nhân bản sang các kỳ tới.`
        : `Rà soát nguyên nhân sụt giảm ở giai đoạn "${trough.label}" để có biện pháp kích cầu kịp thời.`
    });
  }

  if (categoryBreakdown.length >= 2 && primaryMetric) {
    const gapRatio = (topGroup.primarySum / (bottomGroup.primarySum || 1)).toFixed(1);
    dashboardDeepDive.push({
      chart: '2. Biểu đồ Tỷ trọng Pareto & Xếp hạng',
      metricBadge: `Top ${topNCount} chiếm ${topNShare.toFixed(1)}% · Chênh lệch ${gapRatio}x`,
      finding: `Nhóm "${topGroup.label}" dẫn đầu (${formatNumberVN(topGroup.primarySum, true)}), cao gấp ${gapRatio} lần nhóm cuối "${bottomGroup.label}" (${formatNumberVN(bottomGroup.primarySum, true)}).`,
      impact: topNShare > 70
        ? `Rủi ro phụ thuộc cao: hơn 70% kết quả nằm ở nhóm đầu, dễ tổn thương nếu thị trường/kênh này biến động.`
        : `Cơ cấu phân bổ giữa các ${groupDim?.name} tương đối cân bằng, giảm thiểu rủi ro tập trung.`,
      recommendation: topNShare > 70
        ? `Phân bổ lại 15-20% nguồn lực để nuôi dưỡng các nhóm trung bình nhằm đa dạng hóa nguồn thu.`
        : `Tiếp tục đầu tư mở rộng nhóm dẫn đầu "${topGroup.label}" đồng thời tối ưu nhóm cuối.`
    });
  }

  if (primaryMetric && secondaryMetric && categoryBreakdown.length) {
    const bestEff = [...categoryBreakdown].sort((a, b) => (b.marginPct ?? -999) - (a.marginPct ?? -999))[0];
    const lowEff = [...categoryBreakdown].sort((a, b) => (a.marginPct ?? 999) - (b.marginPct ?? 999))[0];
    dashboardDeepDive.push({
      chart: '3. Biểu đồ Đối chiếu Hiệu suất Kép (Y1 vs Y2)',
      metricBadge: `Biên TB: ${overallMargin.toFixed(1)}% · Max ${bestEff.marginPct?.toFixed(1)}% vs Min ${lowEff.marginPct?.toFixed(1)}%`,
      finding: `So sánh ${primaryMetric.name} và ${secondaryMetric.name}: "${bestEff.label}" đạt hiệu suất cao nhất (${bestEff.marginPct?.toFixed(1)}%), trong khi "${lowEff.label}" thấp nhất (${lowEff.marginPct?.toFixed(1)}%).`,
      impact: `Có sự chênh lệch ${( (bestEff.marginPct || 0) - (lowEff.marginPct || 0) ).toFixed(1)} điểm % hiệu quả giữa các nhóm — đây là dư địa lớn nhất để cải thiện lợi nhuận ròng.`,
      recommendation: `Cắt giảm hoặc tái cấu trúc ${secondaryMetric.name} tại "${lowEff.label}", đồng thời dồn ngân sách cho "${bestEff.label}".`
    });
  }

  if (riskMetric || anomalyRecords.length > 0) {
    dashboardDeepDive.push({
      chart: '4. Phân tích Rủi ro & Ngoại lai trên Dashboard',
      metricBadge: `${anomalyRecords.length} điểm ngoại lai IQR${riskMetric ? ` · TB ${riskMetric.name}: ${formatNumberVN(riskMetric.mean)}` : ''}`,
      finding: `Phát hiện ${anomalyRecords.length} điểm dữ liệu vượt ngưỡng thống kê bình thường${riskMetric ? ` và chỉ số rủi ro ${riskMetric.name} dao động từ ${formatNumberVN(riskMetric.min)} đến ${formatNumberVN(riskMetric.max)}` : ''}.`,
      impact: `Các điểm ngoại lai có thể làm lệch giá trị trung bình trên Dashboard nếu không được kiểm chứng thực tế.`,
      recommendation: `Kiểm tra trực tiếp bảng Điểm Bất thường bên dưới để xác nhận đây là cơ hội đột biến hay lỗi vận hành.`
    });
  }

  return {
    company,
    industry,
    objective,
    question,
    overallMargin,
    directAnswer,
    decisionMatrix,
    dashboardDeepDive,
    insights
  };
}

function cleanDataset(rawRows) {
  const seen = new Set();
  const cleaned = [];
  let removedDuplicates = 0;
  let filledMissing = 0;
  let trimmedStrings = 0;

  const colSet = new Set();
  rawRows.forEach(r => Object.keys(r).forEach(k => colSet.add(k)));
  const columns = Array.from(colSet);
  const medians = {};

  columns.forEach(col => {
    const nums = rawRows.map(r => parseNumeric(r[col])).filter(n => n !== null).sort((a, b) => a - b);
    if (nums.length > 0 && nums.length >= rawRows.length * 0.5) {
      const mid = Math.floor(nums.length / 2);
      medians[col] = nums.length % 2 !== 0 ? nums[mid] : Math.round((nums[mid - 1] + nums[mid]) / 2);
    }
  });

  rawRows.forEach(r => {
    const row = {};
    columns.forEach(col => {
      let val = r[col];
      if (typeof val === 'string') {
        const trimmed = val.trim().replace(/\s+/g, ' ');
        if (trimmed !== val) trimmedStrings++;
        val = trimmed;
      }
      if (val === null || val === undefined || val === '') {
        filledMissing++;
        row[col] = medians[col] !== undefined ? medians[col] : 'Chưa phân loại';
      } else {
        row[col] = val;
      }
    });
    const sig = JSON.stringify(row);
    if (seen.has(sig)) removedDuplicates++;
    else {
      seen.add(sig);
      cleaned.push(row);
    }
  });

  return {
    cleanedRows: cleaned,
    report: { removedDuplicates, filledMissing, trimmedStrings }
  };
}

function applyHumanCleaningInstructions(rows, instructionText) {
  let updated = rows.map(r => ({ ...r }));
  const appliedNotes = [];
  const text = (instructionText || '').trim();
  if (!text || !updated.length) return { rows: updated, appliedNotes, matched: false };

  const clauses = text.split(/[;\n]+/).map(s => s.trim()).filter(Boolean);
  const findCol = (name) => {
    const raw = String(name || '').trim().toLowerCase();
    if (!raw) return null;
    const cols = Object.keys(updated[0] || {});
    const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[_\s-]+/g, '');
    const rawNorm = norm(raw);

    // 1. Exact or normalized match
    const direct = cols.find(c => c.toLowerCase() === raw) || cols.find(c => norm(c) === rawNorm);
    if (direct) return direct;

    // 2. Partial match
    const partial = cols.find(c => c.toLowerCase().includes(raw) || norm(c).includes(rawNorm));
    if (partial) return partial;

    // 3. Vietnamese / English semantic aliases
    const aliasRules = [
      { keys: ['doanh thu', 'doanh so', 'sales', 'revenue', 'tien ban'], pat: /doanh_thu|sales|revenue|amount|total/i },
      { keys: ['chi phi', 'gia von', 'cost', 'expense', 'ngan sach'], pat: /chi_phi|cost|expense|ngan_sach|budget/i },
      { keys: ['loi nhuan', 'lai', 'profit', 'margin'], pat: /loi_nhuan|profit|margin/i },
      { keys: ['ty le hoan', 'hoan hang', 'hoan tra', 'return'], pat: /hoan|return/i },
      { keys: ['so don', 'don hang', 'order id', 'ma don'], pat: /so_don|order/i },
      { keys: ['ngay', 'thoi gian', 'date', 'thang', 'tuan'], pat: /date|ngay|thang|tuan|time/i },
      { keys: ['thanh pho', 'tinh', 'city'], pat: /city|thanh_pho|tinh/i },
      { keys: ['khu vuc', 'mien', 'vung', 'region'], pat: /region|khu_vuc|area/i },
      { keys: ['kenh', 'san', 'channel'], pat: /channel|kenh/i },
      { keys: ['phan khuc', 'nhom khach', 'segment'], pat: /segment|phan_khuc/i },
      { keys: ['khach hang', 'customer'], pat: /customer|khach_hang/i },
      { keys: ['danh muc', 'nganh hang', 'category'], pat: /category|danh_muc/i },
      { keys: ['gio ot', 'lam them', 'ot'], pat: /gio_ot|ot/i },
      { keys: ['kpi', 'diem'], pat: /kpi|diem|score/i },
      { keys: ['phong ban', 'bo phan'], pat: /phong_ban|department/i }
    ];

    for (const rule of aliasRules) {
      if (rule.keys.some(k => rawNorm.includes(norm(k)) || raw.includes(k))) {
        const hit = cols.find(c => rule.pat.test(c));
        if (hit) return hit;
      }
    }
    return null;
  };

  clauses.forEach(clause => {
    const cLower = clause.toLowerCase();

    // 1. Rename column: "đổi tên cột A thành B" / "sửa tên cột A -> B"
    const renCol = clause.match(/^(?:đổi|sửa|thay)\s+tên\s+cột\s+["']?(.+?)["']?\s+(?:thành|sang|->|=>)\s+["']?(.+?)["']?$/i);
    if (renCol) {
      const oldCol = findCol(renCol[1]);
      const newCol = renCol[2].trim();
      if (oldCol && newCol && oldCol !== newCol) {
        updated.forEach(r => {
          r[newCol] = r[oldCol];
          delete r[oldCol];
        });
        appliedNotes.push(`Đã đổi tên cột "${oldCol}" → "${newCol}".`);
      }
      return;
    }

    // 2. Drop column: "xóa cột X" / "bỏ cột X"
    const dropCol = clause.match(/^(?:xóa|bỏ|loại|loại bỏ)\s+cột\s+["']?(.+?)["']?$/i);
    if (dropCol) {
      const targetCol = findCol(dropCol[1]);
      if (targetCol) {
        updated.forEach(r => delete r[targetCol]);
        appliedNotes.push(`Đã xóa cột "${targetCol}".`);
      }
      return;
    }

    // 3. Add calculated or constant column: "thêm cột Loi_Nhuan = Sales_VND - Cost_VND"
    const addCol = clause.match(/^(?:thêm|tạo)\s+cột\s+["']?([a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]+)["']?\s*(?:=|bằng)\s*(.+)$/i);
    if (addCol) {
      const newCol = addCol[1].trim();
      const expr = addCol[2].trim();
      const mathMatch = expr.match(/^([a-zA-Z0-9_]+)\s*([+\-*/])\s*([a-zA-Z0-9_.]+)$/);
      if (mathMatch) {
        const colA = findCol(mathMatch[1]);
        const op = mathMatch[2];
        const colB = findCol(mathMatch[3]);
        const numB = parseNumeric(mathMatch[3]);
        if (colA && (colB || numB !== null)) {
          updated.forEach(r => {
            const a = parseNumeric(r[colA]) || 0;
            const b = colB ? (parseNumeric(r[colB]) || 0) : numB;
            let res = 0;
            if (op === '+') res = a + b;
            else if (op === '-') res = a - b;
            else if (op === '*') res = a * b;
            else if (op === '/') res = b !== 0 ? +(a / b).toFixed(2) : 0;
            r[newCol] = res;
          });
          appliedNotes.push(`Đã thêm cột tính toán "${newCol} = ${expr}".`);
          return;
        }
      }
      updated.forEach(r => { r[newCol] = expr.replace(/^["']|["']$/g, ''); });
      appliedNotes.push(`Đã thêm cột "${newCol}" với giá trị "${expr}".`);
      return;
    }

    // 4. Math transform on existing column: "tăng doanh thu lên 10%", "giảm Cost_VND 5%", "làm tròn tỷ lệ hoàn"
    const pctMatch = clause.match(/^(tăng|giảm)\s+(?:cột\s+)?(.+?)\s+(?:lên|đi|thêm)?\s*(\d+(?:\.\d+)?)\s*%$/i);
    if (pctMatch) {
      const col = findCol(pctMatch[2]);
      const pct = parseFloat(pctMatch[3]) / 100;
      const factor = pctMatch[1].toLowerCase() === 'tăng' ? (1 + pct) : (1 - pct);
      if (col) {
        updated.forEach(r => {
          const v = parseNumeric(r[col]);
          if (v !== null) r[col] = Math.round(v * factor * 100) / 100;
        });
        appliedNotes.push(`Đã ${pctMatch[1].toLowerCase()} cột "${col}" ${pctMatch[3]}%.`);
        return;
      }
    }

    const roundMatch = clause.match(/^làm tròn\s+(?:cột\s+)?(.+)$/i);
    if (roundMatch) {
      const col = findCol(roundMatch[1]);
      if (col) {
        updated.forEach(r => {
          const v = parseNumeric(r[col]);
          if (v !== null) r[col] = Math.round(v);
        });
        appliedNotes.push(`Đã làm tròn số nguyên cột "${col}".`);
        return;
      }
    }

    // 5. Numeric filter: "xóa dòng có doanh thu < 1000000" or "chỉ giữ Sales_VND >= 5000000"
    const numFilter = clause.match(/^(xóa|bỏ|loại|giữ|chỉ giữ|lọc)\s+(?:dòng\s+(?:có|với)\s+)?(.+?)\s*(>=|<=|>|<|=|!=)\s*(\d+(?:[.,]\d+)?)$/i);
    if (numFilter) {
      const action = numFilter[1].toLowerCase();
      const col = findCol(numFilter[2]);
      const op = numFilter[3];
      const threshold = parseNumeric(numFilter[4]);
      if (col && threshold !== null) {
        const before = updated.length;
        const testCond = (v) => {
          if (v === null) return false;
          if (op === '>') return v > threshold;
          if (op === '<') return v < threshold;
          if (op === '>=') return v >= threshold;
          if (op === '<=') return v <= threshold;
          if (op === '=') return v === threshold;
          if (op === '!=') return v !== threshold;
          return false;
        };
        const isKeep = /giữ|lọc/.test(action);
        const next = updated.filter(r => {
          const hit = testCond(parseNumeric(r[col]));
          return isKeep ? hit : !hit;
        });
        if (next.length > 0 && next.length < before) {
          updated = next;
          appliedNotes.push(`Đã ${isKeep ? 'giữ lại' : 'xóa'} theo điều kiện "${col} ${op} ${threshold}" (còn ${updated.length}/${before} dòng).`);
        }
        return;
      }
    }

    // 6. Text formatting: "viết hoa cột X", "viết thường cột X", "chuẩn hóa cột X"
    const caseMatch = clause.match(/^(viết hoa|viết thường|chuẩn hóa)\s+(?:cột\s+)?(.+)$/i);
    if (caseMatch) {
      const mode = caseMatch[1].toLowerCase();
      const col = findCol(caseMatch[2]);
      if (col) {
        updated.forEach(r => {
          if (typeof r[col] === 'string') {
            if (mode === 'viết hoa') r[col] = r[col].toUpperCase();
            else if (mode === 'viết thường') r[col] = r[col].toLowerCase();
            else r[col] = r[col].trim().replace(/\s+/g, ' ');
          }
        });
        appliedNotes.push(`Đã ${mode} cột "${col}".`);
        return;
      }
    }

    // 7. Sort rows: handles "sắp xếp doanh thu giảm dần", "sắp xếp giảm dần theo doanh thu", "xếp theo Sales_VND từ cao đến thấp"
    if (/^(?:sắp xếp|xếp|sort)\b/i.test(cLower)) {
      const isAsc = /tăng dần|từ thấp đến cao|nhỏ đến lớn|\basc\b/i.test(cLower);
      const desc = !isAsc;
      const colText = clause
        .replace(/^(?:sắp xếp|xếp|sort)\s*/i, '')
        .replace(/\b(?:tăng dần|giảm dần|từ cao đến thấp|từ thấp đến cao|lớn đến nhỏ|nhỏ đến lớn|asc|desc)\b/gi, '')
        .replace(/\b(?:theo|cột|by)\b/gi, '')
        .trim();
      const col = findCol(colText);
      if (col) {
        updated.sort((a, b) => {
          const na = parseNumeric(a[col]);
          const nb = parseNumeric(b[col]);
          if (na !== null && nb !== null) return desc ? nb - na : na - nb;
          return desc
            ? String(b[col] ?? '').localeCompare(String(a[col] ?? ''))
            : String(a[col] ?? '').localeCompare(String(b[col] ?? ''));
        });
        appliedNotes.push(`Đã sắp xếp bảng theo "${col}" (${desc ? 'giảm dần' : 'tăng dần'}).`);
        return;
      }
    }

    // 8. Fill missing or remove rows with missing values
    if (/xóa.*(?:ô trống|thiếu|null|missing|rỗng)/i.test(cLower)) {
      const before = updated.length;
      const next = updated.filter(r => Object.values(r).every(v => v !== null && v !== undefined && String(v).trim() !== ''));
      if (next.length > 0) {
        updated = next;
        appliedNotes.push(`Đã xóa ${before - updated.length} dòng có ô trống (còn ${updated.length} dòng).`);
      }
      return;
    }
    const fillMatch = clause.match(/^(?:điền|thay ô trống bằng)\s+["']?(.+?)["']?(?:\s+cho ô trống)?$/i);
    if (fillMatch) {
      const fillVal = fillMatch[1].trim();
      let count = 0;
      updated.forEach(r => {
        Object.keys(r).forEach(k => {
          if (r[k] === null || r[k] === undefined || String(r[k]).trim() === '' || r[k] === 'Chưa phân loại') {
            r[k] = fillVal;
            count++;
          }
        });
      });
      appliedNotes.push(`Đã điền "${fillVal}" cho ${count} ô trống/chưa phân loại.`);
      return;
    }

    // 9. Deduplicate: "xóa trùng lặp" / "xóa trùng theo Order_ID"
    if (/xóa trùng/i.test(cLower)) {
      const byCol = clause.match(/theo\s+([a-zA-Z0-9_]+)/i);
      const col = byCol ? findCol(byCol[1]) : null;
      const seen = new Set();
      const before = updated.length;
      updated = updated.filter(r => {
        const key = col ? String(r[col] ?? '') : JSON.stringify(r);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      appliedNotes.push(`Đã xóa ${before - updated.length} dòng trùng${col ? ` theo "${col}"` : ''} (còn ${updated.length} dòng).`);
      return;
    }

    // 10. Top N / Slice: "chỉ giữ 50 dòng đầu"
    const topMatch = clause.match(/^(?:chỉ giữ|lấy)\s+(\d+)\s+dòng\s+đầu$/i);
    if (topMatch) {
      const n = parseInt(topMatch[1], 10);
      if (n > 0 && n < updated.length) {
        updated = updated.slice(0, n);
        appliedNotes.push(`Đã giữ lại ${n} dòng đầu tiên.`);
      }
      return;
    }

    // 10b. Conditional update: "nếu <col> <op> <val> thì sửa/gán/đổi <targetCol> thành/= <newVal>"
    const ifMatch = clause.match(/^nếu\s+([a-zA-Z0-9_]+)\s*(>=|<=|>|<|=|!=|là|bằng|chứa)\s*["']?(.+?)["']?\s+thì\s+(?:sửa|gán|đổi|đặt)\s+(?:cột\s+)?([a-zA-Z0-9_]+)\s*(?:thành|=|bằng)\s*["']?(.+?)["']?$/i);
    if (ifMatch) {
      const condCol = findCol(ifMatch[1]);
      const op = ifMatch[2].toLowerCase();
      const condVal = ifMatch[3].trim();
      const targetCol = findCol(ifMatch[4]) || ifMatch[4].trim();
      const rawNew = ifMatch[5].trim();
      const numNew = parseNumeric(rawNew);
      const newVal = (numNew !== null && !/^0\d+$/.test(rawNew)) ? numNew : rawNew;

      if (condCol) {
        let count = 0;
        updated.forEach(r => {
          const cell = r[condCol];
          const numCell = parseNumeric(cell);
          const numCond = parseNumeric(condVal);
          let hit = false;
          if (['>', '<', '>=', '<='].includes(op) && numCell !== null && numCond !== null) {
            if (op === '>') hit = numCell > numCond;
            else if (op === '<') hit = numCell < numCond;
            else if (op === '>=') hit = numCell >= numCond;
            else if (op === '<=') hit = numCell <= numCond;
          } else if (op === '!=' ) {
            hit = String(cell ?? '').trim().toLowerCase() !== condVal.toLowerCase();
          } else if (op === 'chứa') {
            hit = String(cell ?? '').toLowerCase().includes(condVal.toLowerCase());
          } else {
            hit = String(cell ?? '').trim().toLowerCase() === condVal.toLowerCase();
          }
          if (hit) {
            r[targetCol] = newVal;
            count++;
          }
        });
        appliedNotes.push(`Đã cập nhật có điều kiện "${targetCol} = ${newVal}" cho ${count} dòng thỏa "${condCol} ${op} ${condVal}".`);
        return;
      }
    }

    // 10c. Merge columns: "gộp cột A và B thành C"
    const mergeMatch = clause.match(/^gộp\s+(?:cột\s+)?([a-zA-Z0-9_]+)\s+(?:và|với|\+)\s+([a-zA-Z0-9_]+)\s+(?:thành|sang|->)\s+([a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]+)$/i);
    if (mergeMatch) {
      const colA = findCol(mergeMatch[1]);
      const colB = findCol(mergeMatch[2]);
      const target = mergeMatch[3].trim();
      if (colA && colB) {
        updated.forEach(r => {
          r[target] = `${r[colA] ?? ''} - ${r[colB] ?? ''}`.replace(/^\s*-\s*|\s*-\s*$/g, '');
        });
        appliedNotes.push(`Đã gộp cột "${colA}" và "${colB}" thành "${target}".`);
        return;
      }
    }

    // 10d. Split column: "tách cột A theo <sep> thành B, C"
    const splitMatch = clause.match(/^tách\s+(?:cột\s+)?([a-zA-Z0-9_]+)\s+(?:theo|bằng)\s+["']?(.+?)["']?\s+thành\s+(.+)$/i);
    if (splitMatch) {
      const srcCol = findCol(splitMatch[1]);
      const sep = splitMatch[2] === 'khoảng trắng' ? ' ' : splitMatch[2];
      const targets = splitMatch[3].split(/[,;]+/).map(s => s.trim()).filter(Boolean);
      if (srcCol && targets.length >= 2) {
        updated.forEach(r => {
          const parts = String(r[srcCol] ?? '').split(sep);
          targets.forEach((t, idx) => { r[t] = (parts[idx] ?? '').trim(); });
        });
        appliedNotes.push(`Đã tách cột "${srcCol}" thành ${targets.join(', ')}.`);
        return;
      }
    }

    // 10e. Strip substring / Add prefix / Extract month:
    const stripMatch = clause.match(/^(?:bỏ|xóa)\s+(?:chữ|ký tự|từ|chuỗi)\s+["']?(.+?)["']?\s+(?:trong|ở)\s+(?:cột\s+)?([a-zA-Z0-9_]+)$/i);
    if (stripMatch) {
      const sub = stripMatch[1];
      const col = findCol(stripMatch[2]);
      if (col) {
        let count = 0;
        updated.forEach(r => {
          const s = String(r[col] ?? '');
          if (s.includes(sub)) {
            r[col] = s.split(sub).join('').trim();
            count++;
          }
        });
        appliedNotes.push(`Đã bỏ "${sub}" trong cột "${col}" (${count} ô).`);
        return;
      }
    }

    const prefixMatch = clause.match(/^thêm\s+(?:tiền tố|chữ)\s+["']?(.+?)["']?\s+(?:vào|cho)\s+(?:cột\s+)?([a-zA-Z0-9_]+)$/i);
    if (prefixMatch) {
      const pre = prefixMatch[1];
      const col = findCol(prefixMatch[2]);
      if (col) {
        updated.forEach(r => { r[col] = `${pre}${r[col] ?? ''}`; });
        appliedNotes.push(`Đã thêm tiền tố "${pre}" cho cột "${col}".`);
        return;
      }
    }

    const monthExtract = clause.match(/^(?:chuyển|rút gọn|lấy tháng)\s+(?:cột\s+)?([a-zA-Z0-9_]+)\s+(?:sang|thành)\s+tháng$/i);
    if (monthExtract) {
      const col = findCol(monthExtract[1]);
      if (col) {
        updated.forEach(r => {
          const s = String(r[col] ?? '').trim();
          if (/^\d{4}-\d{2}-\d{2}/.test(s)) r[col] = s.slice(0, 7);
        });
        appliedNotes.push(`Đã rút gọn cột "${col}" sang định dạng Tháng (YYYY-MM).`);
        return;
      }
    }

    // 10f. Remove outliers (IQR) or negative values: "xóa ngoại lai của Sales_VND" / "xóa giá trị âm"
    if (/xóa.*giá trị âm|loại.*số âm/i.test(cLower)) {
      const before = updated.length;
      updated = updated.filter(r => !Object.values(r).some(v => {
        const n = parseNumeric(v);
        return n !== null && n < 0;
      }));
      appliedNotes.push(`Đã xóa ${before - updated.length} dòng chứa giá trị âm (còn ${updated.length} dòng).`);
      return;
    }

    const outlierMatch = clause.match(/^(?:xóa|bỏ|loại)\s+(?:các\s+)?(?:dòng\s+)?ngoại lai(?:\s+(?:của|theo)\s+([a-zA-Z0-9_]+))?$/i);
    if (outlierMatch) {
      const col = outlierMatch[1] ? findCol(outlierMatch[1]) : Object.keys(updated[0] || {}).find(c => parseNumeric(updated[0][c]) !== null);
      if (col) {
        const nums = updated.map(r => parseNumeric(r[col])).filter(n => n !== null).sort((a, b) => a - b);
        if (nums.length >= 4) {
          const q1 = nums[Math.floor(nums.length * 0.25)];
          const q3 = nums[Math.floor(nums.length * 0.75)];
          const iqr = q3 - q1;
          const lo = q1 - 1.5 * iqr;
          const hi = q3 + 1.5 * iqr;
          const before = updated.length;
          updated = updated.filter(r => {
            const n = parseNumeric(r[col]);
            return n === null || (n >= lo && n <= hi);
          });
          appliedNotes.push(`Đã loại bỏ ${before - updated.length} dòng ngoại lai IQR theo "${col}" (còn ${updated.length} dòng).`);
          return;
        }
      }
    }

    // 10g. Edit or delete by explicit 1-based row number: "xóa dòng 1, 3" / "sửa dòng 2 cột City thành Đà Nẵng"
    const editCellMatch = clause.match(/^(?:sửa|đổi|gán)\s+dòng\s+(?:số\s+)?(\d+)\s+cột\s+([a-zA-Z0-9_]+)\s+(?:thành|=)\s+["']?(.+?)["']?$/i);
    if (editCellMatch) {
      const idx = parseInt(editCellMatch[1], 10) - 1;
      const col = findCol(editCellMatch[2]);
      if (idx >= 0 && idx < updated.length && col) {
        updated[idx][col] = editCellMatch[3].trim();
        appliedNotes.push(`Đã sửa dòng #${idx + 1}, cột "${col}" → "${editCellMatch[3].trim()}".`);
        return;
      }
    }

    const delRowIdxMatch = clause.match(/^(?:xóa|bỏ)\s+dòng\s+(?:số\s+)?([\d,\s]+)$/i);
    if (delRowIdxMatch) {
      const idxs = new Set(delRowIdxMatch[1].split(/[,\s]+/).map(x => parseInt(x, 10) - 1).filter(x => x >= 0));
      const before = updated.length;
      updated = updated.filter((_, i) => !idxs.has(i));
      if (updated.length < before) {
        appliedNotes.push(`Đã xóa ${before - updated.length} dòng theo chỉ số (còn ${updated.length} dòng).`);
        return;
      }
    }

    // 11. Replace value: "thay/đổi/sửa A thành/sang/-> B"
    const rep = clause.match(/^(?:thay|đổi|sửa)\s+["']?(.+?)["']?\s+(?:thành|sang|->|=>)\s+["']?(.+?)["']?$/i);
    if (rep) {
      const fromVal = rep[1].trim().toLowerCase();
      const toVal = rep[2].trim();
      let count = 0;
      updated.forEach(r => {
        Object.keys(r).forEach(k => {
          if (String(r[k] ?? '').trim().toLowerCase() === fromVal) {
            r[k] = toVal;
            count++;
          }
        });
      });
      if (count > 0) {
        appliedNotes.push(`Đã sửa "${rep[1].trim()}" → "${toVal}" (${count} ô).`);
      }
      return;
    }

    // 12. Drop rows by text/ID: "xóa cc-ord-103727" or "bỏ Miền Bắc"
    const dropRow = clause.match(/^(?:xóa|bỏ|loại|loại bỏ|trừ)\s+(?:dòng\s+(?:chứa|có)\s+)?["']?(.+?)["']?$/i);
    if (dropRow) {
      const kw = dropRow[1].trim().toLowerCase();
      const before = updated.length;
      const next = updated.filter(r => !Object.values(r).some(v => String(v ?? '').toLowerCase().includes(kw)));
      const removed = before - next.length;
      if (removed > 0) {
        updated = next;
        appliedNotes.push(`Đã xóa ${removed} dòng chứa "${dropRow[1].trim()}" (còn ${updated.length} dòng).`);
      }
      return;
    }

    // 13. Keep only rows by text: "giữ Hà Nội" / "lọc TikTok Shop"
    const keepRow = clause.match(/^(?:giữ|chỉ giữ|lọc)\s+(?:dòng\s+(?:chứa|có)\s+)?["']?(.+?)["']?$/i);
    if (keepRow) {
      const kw = keepRow[1].trim().toLowerCase();
      const before = updated.length;
      const next = updated.filter(r => Object.values(r).some(v => String(v ?? '').toLowerCase().includes(kw)));
      if (next.length > 0 && next.length < before) {
        updated = next;
        appliedNotes.push(`Đã giữ lại ${next.length}/${before} dòng chứa "${keepRow[1].trim()}".`);
      }
    }
  });

  return { rows: updated, appliedNotes, matched: appliedNotes.length > 0 };
}

async function applyHumanCleaningInstructionsAsync(rows, instructionText) {
  // First try rich deterministic local parser
  const localRes = applyHumanCleaningInstructions(rows, instructionText);
  if (localRes.matched) return localRes;

  // If local parser didn't match and user has Gemini API key, ask Gemini to translate into declarative operations
  const apiKey = localStorage.getItem('azurepulse_gemini_key');
  if (apiKey && apiKey.trim().length > 10 && rows.length) {
    try {
      const cols = Object.keys(rows[0]);
      const sample = rows.slice(0, 3);
      const prompt = `Bạn là Data Engineer. Bảng có các cột: ${JSON.stringify(cols)}. Mẫu 3 dòng: ${JSON.stringify(sample)}.
Người dùng yêu cầu: "${instructionText}".
Hãy chuyển yêu cầu thành 1 hoặc nhiều lệnh chuẩn cách nhau bằng dấu chấm phẩy (;), CHỈ dùng các cú pháp sau:
- xóa cột <ten_cot>
- đổi tên cột <cu> thành <moi>
- thêm cột <moi> = <cotA> - <cotB> (hoặc + * /)
- nếu <cot> <op> <gia_tri> thì sửa <cot_dich> thành <gia_tri_moi>
- gộp cột <A> và <B> thành <C>
- tách cột <A> theo <ky_tu> thành <B>, <C>
- bỏ chữ <chuoi> trong cột <cot>
- thêm tiền tố <chuoi> cho cột <cot>
- chuyển cột <cot> sang tháng
- xóa ngoại lai của <cot>
- xóa giá trị âm
- xóa dòng số <1, 2>
- sửa dòng <n> cột <cot> thành <gia_tri>
- xóa <gia_tri> | giữ <gia_tri> | sửa <cu> thành <moi>
- xóa <cot> < <so> | giữ <cot> >= <so>
- sắp xếp theo <cot> giảm dần | viết hoa cột <cot> | xóa trùng theo <cot>
Chỉ trả về chuỗi lệnh, không giải thích.`;

      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey.trim())}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        const translated = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (translated) {
          const aiRes = applyHumanCleaningInstructions(rows, translated);
          if (aiRes.matched) return aiRes;
        }
      }
    } catch (e) {
      // Fall through cleanly
    }
  }

  return localRes;
}

async function answerDataQuestion(question, analysis, mode = 'analyst') {
  const q = question.toLowerCase().trim();
  if (!analysis) {
    return 'Hiện chưa có dữ liệu nào được phân tích. Vui lòng điền Bối cảnh Doanh nghiệp và tải file dữ liệu ở bước Nạp dữ liệu nhé!';
  }

  const ctx = analysis.businessContext || {};
  const apiKey = localStorage.getItem('azurepulse_gemini_key');
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const contextSummary = {
        businessContext: ctx,
        dataset: analysis.datasetName,
        rows: analysis.totalRows,
        columns: analysis.colProfiles.map(c => ({
          name: c.name, type: c.type, missing: c.missing, sum: c.sum, mean: c.mean, min: c.min, max: c.max, top: c.topCategory
        })),
        topBreakdown: analysis.categoryBreakdown.slice(0, 5),
        anomalies: analysis.anomalyRecords.slice(0, 5),
        executiveAnswer: analysis.executiveReport?.directAnswer
      };
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey.trim())}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Bạn là AzurePulse AI (${mode}), cố vấn phân tích dữ liệu cho doanh nghiệp "${ctx.companyName || ''}" (${ctx.industry || ''}), mục tiêu: "${ctx.objective || ''}". Trả lời sâu sắc, ngắn gọn bằng tiếng Việt dựa trên dữ liệu:\n${JSON.stringify(contextSummary)}\n\nCâu hỏi: ${question}`
              }]
            }]
          })
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (err) {
      // Fallback to local engine
    }
  }

  const pm = analysis.primaryMetric;
  if (/bối cảnh|mục tiêu|quản trị|trả lời|quyết định/.test(q)) {
    return analysis.executiveReport?.directAnswer || 'Đã tổng hợp báo cáo quản trị trong tab Báo cáo Quản trị.';
  }
  if (/tổng quan|tóm tắt|summary|overview/.test(q)) {
    return `📊 **Tóm tắt cho ${ctx.companyName || 'Doanh nghiệp'} (${analysis.datasetName})**:\n- Quy mô: **${analysis.totalRows} dòng** × **${analysis.totalCols} cột** (Health: **${analysis.healthScore}/100**).\n- ${pm ? `Tổng **${pm.name}**: **${formatNumberVN(pm.sum, true)}** (TB: ${formatNumberVN(pm.mean, true)}).` : ''}\n- Nhóm dẫn đầu: **${analysis.categoryBreakdown[0]?.label || '—'}** (Top ${Math.max(1, Math.ceil(analysis.categoryBreakdown.length * 0.3))} nhóm chiếm **${analysis.topNShare.toFixed(1)}%**).`;
  }
  if (/bất thường|ngoại lai|rủi ro|outlier|thiếu|lỗi|làm sạch/.test(q)) {
    const anomStr = analysis.anomalyRecords.slice(0, 3).map(a => `• Dòng ${a.rowIndex} (${a.contextLabel}): ${a.column} = ${formatNumberVN(a.value, true)} (${a.direction})`).join('\n');
    return `⚠️ **Phát hiện rủi ro & chất lượng dữ liệu**:\n- Ô thiếu: **${analysis.totalMissingCells}** | Trùng lặp: **${analysis.duplicateCount}** | Ngoại lai: **${analysis.anomalyRecords.length}**\n${anomStr || 'Không có điểm ngoại lai nghiêm trọng.'}`;
  }
  if (/cao nhất|top|dẫn đầu|lớn nhất|tốt nhất/.test(q) && analysis.categoryBreakdown.length) {
    const top3 = analysis.categoryBreakdown.slice(0, 3)
      .map((item, i) => `${i + 1}. **${item.label}**: ${formatNumberVN(item.primarySum, true)}${item.marginPct !== null ? ` (Biên: ${item.marginPct.toFixed(1)}%)` : ''}`)
      .join('\n');
    return `🏆 **Top ${analysis.groupDim?.name} theo ${pm?.name}**:\n${top3}`;
  }
  if (/đề xuất|giải pháp|hành động|nên làm/.test(q)) {
    return analysis.insights.slice(0, 3).map(i => `• **[${i.tag}]**: ${i.action}`).join('\n');
  }

  const matchedCol = analysis.colProfiles.find(c => q.includes(c.name.toLowerCase()));
  if (matchedCol) {
    if (matchedCol.type === 'number') {
      return `📈 Thống kê **${matchedCol.name}**: Tổng **${formatNumberVN(matchedCol.sum, true)}** | TB **${formatNumberVN(matchedCol.mean, true)}** | Min **${formatNumberVN(matchedCol.min, true)}** | Max **${formatNumberVN(matchedCol.max, true)}** | Ngoại lai: ${matchedCol.outliers}`;
    }
    return `🏷️ Cột **${matchedCol.name}** có **${matchedCol.uniqueCount}** nhóm. Phổ biến nhất: **${matchedCol.topCategory?.label}** (${matchedCol.topCategory?.count} dòng).`;
  }

  return `Tôi đang phân tích dữ liệu cho **${ctx.companyName || analysis.datasetName}** (Mục tiêu: ${ctx.objective || 'BI'}). Bạn có thể hỏi: *"Trả lời câu hỏi quản trị"*, *"Top dẫn đầu"*, *"Điểm bất thường & rủi ro"*, hoặc *"Đề xuất hành động"*.`;
}
