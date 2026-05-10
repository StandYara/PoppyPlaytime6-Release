import os
from pathlib import Path
import sys


def print_progress(current, total, filename):
    """Показывает прогресс обработки"""
    percent = (current / total) * 100
    bar = '█' * int(percent / 2) + '░' * (50 - int(percent / 2))
    sys.stdout.write(f'\r⏳ Прогресс: |{bar}| {current}/{total} файлов ({percent:.1f}%) - {filename[:30]}...')
    sys.stdout.flush()


def get_project_structure(startpath='.', exclude_dirs=None, exclude_files=None):
    """Создает красивое дерево структуры проекта"""
    if exclude_dirs is None:
        exclude_dirs = {'.venv', '__pycache__', '.git', 'instance', '.idea', '.vscode', 'venv', 'env', 'node_modules'}

    if exclude_files is None:
        exclude_files = {'structure.txt', 'project_dump_clean.txt', 'project_dump.txt'}

    structure = []
    structure.append("📁 СТРУКТУРА ПРОЕКТА")
    structure.append("=" * 60)

    for root, dirs, files in os.walk(startpath):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]

        level = root.replace(startpath, '').count(os.sep)
        indent = '│   ' * (level - 1) + '├── ' if level > 0 else ''

        if level == 0:
            structure.append(f"📂 {os.path.basename(root) or '.'}")
        else:
            structure.append(f"{indent}📂 {os.path.basename(root)}")

        subindent = '│   ' * level + '├── '
        for file in sorted(files):
            if file in exclude_files:
                continue
            if not file.endswith(('.pyc', '.pyo', '.log', '.db')):
                structure.append(f"{subindent}{file}")

    structure.append("=" * 60)
    structure.append("")
    return '\n'.join(structure)


def get_all_files():
    """Собирает список всех файлов для обработки"""
    allowed_extensions = {
        '.py', '.js', '.html', '.css', '.txt',
        '.json', '.md', '.yml', '.yaml', '.ini',
        '.cfg', '.conf', '.sh', '.bat', '.env'
    }

    exclude_dirs = {
        '.venv', '__pycache__', '.git', 'instance',
        '.idea', '.vscode', 'venv', 'env', 'node_modules',
        'dist', 'build', 'logs', 'tmp', 'temp'
    }

    exclude_files = {
        'structure.txt',
        'project_dump_clean.txt',
        'project_dump.txt',
        'collect_project.py',
        '.DS_Store',
        'Thumbs.db',
        'desktop.ini'
    }

    exclude_patterns = {
        '*.pyc', '*.pyo', '*.log', '*.db', '*.sqlite3',
        '*.bak', '*.swp', '*.swo'
    }

    files_list = []

    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]

        for file in files:
            filepath = os.path.join(root, file)

            if file == 'structure.txt':
                print(f"🚫 Пропускаем: {filepath}")
                continue

            if file in exclude_files:
                continue

            ext = os.path.splitext(file)[1].lower()

            if ext not in allowed_extensions:
                continue

            skip = False
            for pattern in exclude_patterns:
                if pattern.startswith('*') and file.endswith(pattern[1:]):
                    skip = True
                    break
            if skip:
                continue

            files_list.append(filepath)

    return sorted(files_list)


def is_file_empty(filepath):
    """Проверяет, пустой ли файл"""
    try:
        return os.path.getsize(filepath) == 0
    except:
        return True


def read_file_safe(filepath):
    """Безопасное чтение файла с разными кодировками"""
    encodings = ['utf-8', 'cp1251', 'latin-1', 'ascii', 'cp866']

    for encoding in encodings:
        try:
            with open(filepath, 'r', encoding=encoding) as f:
                content = f.read()
                if content.startswith('\ufeff'):
                    content = content[1:]
                return content, encoding
        except UnicodeDecodeError:
            continue
        except Exception:
            continue

    return None, None


def collect_files():
    """Собирает все файлы проекта в один чистый дамп"""
    print("🚀 Запуск сбора проекта...")
    print("=" * 60)
    print("⚠️  Файл structure.txt будет ИСКЛЮЧЕН!")
    print("=" * 60)

    all_files = get_all_files()
    total_files = len(all_files)
    print(f"📊 Найдено {total_files} файлов для обработки")
    print("=" * 60)

    output = []

    output.append(get_project_structure(exclude_files={'structure.txt', 'project_dump_clean.txt', 'project_dump.txt'}))

    processed = 0
    empty_files = 0
    error_files = 0
    skipped_files = 0

    for i, filepath in enumerate(all_files, 1):
        filename = os.path.basename(filepath)

        if filename == 'structure.txt':
            skipped_files += 1
            continue

        print_progress(i, total_files, filename)

        if is_file_empty(filepath):
            empty_files += 1
            continue

        output.append(f"\n{'=' * 80}")
        output.append(f"📄 ФАЙЛ: {filepath}")
        output.append(f"{'=' * 80}\n")

        content, encoding = read_file_safe(filepath)

        if content is not None:
            output.append(content)
            processed += 1
        else:
            output.append(f"[Невозможно прочитать файл]")
            error_files += 1

    print()

    output.append(f"\n{'=' * 80}")
    output.append(f"📊 СТАТИСТИКА:")
    output.append(f"{'=' * 80}")
    output.append(f"✅ Успешно обработано: {processed} файлов")
    output.append(f"⏭️ Пропущено (пустые): {empty_files} файлов")
    output.append(f"🚫 Принудительно исключено: {skipped_files} файлов (structure.txt)")
    output.append(f"❌ Ошибок чтения: {error_files} файлов")
    output.append(f"📁 Всего найдено: {total_files} файлов")
    output.append(f"{'=' * 80}")

    result = '\n'.join(output)

    import re
    result = re.sub(r'\n{4,}', '\n\n\n', result)

    output_file = 'project_dump_clean.txt'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(result)

    file_size = os.path.getsize(output_file) / 1024

    print(f"\n{'=' * 60}")
    print(f"✅ ГОТОВО! Создан файл: {output_file}")
    print(f"📦 Размер: {file_size:.2f} KB")
    print(f"📁 Всего строк в дампе: {len(result.splitlines())}")
    print(f"{'=' * 60}")
    print(f"💡 Теперь загрузи файл {output_file} в DeepSeek")
    print(f"🚫 Файл structure.txt БЫЛ ИСКЛЮЧЕН!")


if __name__ == '__main__':
    collect_files()