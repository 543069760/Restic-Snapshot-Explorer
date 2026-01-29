import { useState } from 'react';
import { 
  Plus, Edit2, Trash2, HardDrive, Server, Cloud, Globe,
  Check, AlertCircle, Eye, EyeOff, Key, Folder, ExternalLink,
  Variable, Terminal, ChevronDown, ChevronUp
} from 'lucide-react';
import type { Repository, RepositoryFormData, KeyValuePair, CustomParam } from '@/types/repository';
import { REPOSITORY_TYPES } from '@/types/repository';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { toast } from 'sonner';

interface RepositorySettingsProps {
  isOpen: boolean;
  onClose: () => void;
  repositories: Repository[];
  currentRepository: Repository | null;
  onAdd: (data: RepositoryFormData) => void;
  onUpdate: (id: string, data: Partial<RepositoryFormData>) => void;
  onDelete: (id: string) => void;
  onSwitch: (id: string) => void;
}

interface RepositoryFormProps {
  repository?: Repository;
  onSubmit: (data: RepositoryFormData) => void;
  onCancel: () => void;
}

// Key-Value Editor Component
interface KeyValueEditorProps {
  items: KeyValuePair[];
  onChange: (items: KeyValuePair[]) => void;
}

function KeyValueEditor({ items, onChange }: KeyValueEditorProps) {
  const addItem = () => {
    onChange([...items, { id: `var-${Date.now()}`, key: '', value: '' }]);
  };

  const updateItem = (id: string, field: 'key' | 'value', value: string) => {
    onChange(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <Input
            placeholder="变量名"
            value={item.key}
            onChange={(e) => updateItem(item.id, 'key', e.target.value)}
            className="flex-1 border-white/10 bg-zinc-950 text-sm text-zinc-100 placeholder:text-zinc-600"
          />
          <span className="text-zinc-500">=</span>
          <Input
            placeholder="值"
            value={item.value}
            onChange={(e) => updateItem(item.id, 'value', e.target.value)}
            className="flex-1 border-white/10 bg-zinc-950 text-sm text-zinc-100 placeholder:text-zinc-600"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id)}
            className="h-8 w-8 shrink-0 text-zinc-500 hover:text-rose-400"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addItem}
        className="w-full border-dashed border-white/20 text-zinc-400 hover:border-sky-500/50 hover:text-sky-400"
      >
        <Plus className="mr-1 h-4 w-4" />
        添加变量
      </Button>
    </div>
  );
}

// Custom Params Editor Component
interface CustomParamsEditorProps {
  items: CustomParam[];
  onChange: (items: CustomParam[]) => void;
}

function CustomParamsEditor({ items, onChange }: CustomParamsEditorProps) {
  const addItem = () => {
    onChange([...items, { id: `param-${Date.now()}`, value: '' }]);
  };

  const updateItem = (id: string, value: string) => {
    onChange(items.map(item => 
      item.id === id ? { ...item, value } : item
    ));
  };

  const removeItem = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <span className="shrink-0 text-sm text-zinc-500">--</span>
          <Input
            placeholder="参数命令，例如: verbose 或 option s3.region=us-east-1"
            value={item.value}
            onChange={(e) => updateItem(item.id, e.target.value)}
            className="flex-1 border-white/10 bg-zinc-950 text-sm text-zinc-100 placeholder:text-zinc-600"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id)}
            className="h-8 w-8 shrink-0 text-zinc-500 hover:text-rose-400"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addItem}
        className="w-full border-dashed border-white/20 text-zinc-400 hover:border-sky-500/50 hover:text-sky-400"
      >
        <Plus className="mr-1 h-4 w-4" />
        添加参数
      </Button>
    </div>
  );
}

function RepositoryForm({ repository, onSubmit, onCancel }: RepositoryFormProps) {
  const [formData, setFormData] = useState<RepositoryFormData>({
    name: repository?.name || '',
    url: repository?.url || '',
    password: repository?.password || '',
    type: repository?.type || 'local',
    options: repository?.options || {},
    customVars: repository?.customVars || [],
    customParams: repository?.customParams || []
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = '请输入仓库名称';
    }
    if (!formData.url.trim()) {
      newErrors.url = '请输入仓库地址';
    }
    if (!formData.password.trim()) {
      newErrors.password = '请输入仓库密码';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const updateCustomVars = (customVars: KeyValuePair[]) => {
    setFormData(prev => ({ ...prev, customVars }));
  };

  const updateCustomParams = (customParams: CustomParam[]) => {
    setFormData(prev => ({ ...prev, customParams }));
  };

  const getPlaceholder = (type: string) => {
    switch (type) {
      case 'local':
        return '/path/to/restic-repo';
      case 'sftp':
        return 'sftp:user@host:/path/to/repo';
      case 's3':
        return 's3:s3.amazonaws.com/bucket-name';
      case 'b2':
        return 'b2:bucket-name:path';
      case 'azure':
        return 'azure:container-name:/path';
      case 'gs':
        return 'gs:bucket-name:/path';
      case 'rest':
        return 'rest:http://host:8000/';
      default:
        return '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">仓库名称</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="我的备份仓库"
          className={`mt-1 border-white/10 bg-zinc-950 text-zinc-100 ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div>
        <Label htmlFor="type">仓库类型</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}
        >
          <SelectTrigger className="mt-1 border-white/10 bg-zinc-950 text-zinc-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-zinc-900">
            {REPOSITORY_TYPES.map((type) => (
              <SelectItem 
                key={type.value} 
                value={type.value}
                className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100"
              >
                <div className="flex items-center gap-2">
                  {type.value === 'local' && <HardDrive className="h-4 w-4" />}
                  {type.value === 'sftp' && <Server className="h-4 w-4" />}
                  {(type.value === 's3' || type.value === 'b2' || type.value === 'azure' || type.value === 'gs') && <Cloud className="h-4 w-4" />}
                  {type.value === 'rest' && <Globe className="h-4 w-4" />}
                  {type.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="url">仓库地址</Label>
        <Input
          id="url"
          value={formData.url}
          onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
          placeholder={getPlaceholder(formData.type)}
          className={`mt-1 border-white/10 bg-zinc-950 text-zinc-100 ${errors.url ? 'border-red-500' : ''}`}
        />
        {errors.url && <p className="mt-1 text-xs text-red-400">{errors.url}</p>}
      </div>

      <div>
        <Label htmlFor="password">仓库密码</Label>
        <div className="relative mt-1">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="RESTIC_PASSWORD"
            className={`border-white/10 bg-zinc-950 pr-10 text-zinc-100 ${errors.password ? 'border-red-500' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
      </div>

      {formData.type === 's3' && (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3">
          <p className="flex items-center gap-2 text-sm text-amber-400">
            <AlertCircle className="h-4 w-4" />
            S3 仓库需要配置 AWS_ACCESS_KEY_ID 和 AWS_SECRET_ACCESS_KEY 环境变量
          </p>
        </div>
      )}

      {/* Advanced Settings */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="flex w-full items-center justify-between p-0 text-zinc-400 hover:text-zinc-200"
          >
            <span className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              高级设置
            </span>
            {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-2">
          {/* Custom Variables */}
          <div className="rounded-lg border border-white/5 bg-zinc-900/50 p-4">
            <Label className="mb-3 flex items-center gap-2 text-zinc-300">
              <Variable className="h-4 w-4 text-sky-400" />
              自定义变量 (Key = Value)
            </Label>
            <p className="mb-3 text-xs text-zinc-500">
              定义环境变量，将在执行 restic 命令时使用
            </p>
            <KeyValueEditor items={formData.customVars} onChange={updateCustomVars} />
          </div>

          {/* Custom Parameters */}
          <div className="rounded-lg border border-white/5 bg-zinc-900/50 p-4">
            <Label className="mb-3 flex items-center gap-2 text-zinc-300">
              <Terminal className="h-4 w-4 text-violet-400" />
              自定义参数命令
            </Label>
            <p className="mb-3 text-xs text-zinc-500">
              添加额外的 restic 命令行参数
            </p>
            <CustomParamsEditor items={formData.customParams} onChange={updateCustomParams} />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <DialogFooter className="pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-white/10 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
        >
          取消
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-sky-500 to-violet-500 text-white hover:from-sky-600 hover:to-violet-600"
        >
          {repository ? '保存' : '添加'}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function RepositorySettings({
  isOpen,
  onClose,
  repositories,
  currentRepository,
  onAdd,
  onUpdate,
  onDelete,
  onSwitch
}: RepositorySettingsProps) {
  const [editingRepo, setEditingRepo] = useState<Repository | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleAdd = (data: RepositoryFormData) => {
    onAdd(data);
    setIsAdding(false);
    toast.success('仓库添加成功');
  };

  const handleUpdate = (data: RepositoryFormData) => {
    if (editingRepo) {
      onUpdate(editingRepo.id, data);
      setEditingRepo(null);
      toast.success('仓库更新成功');
    }
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    setDeleteConfirmId(null);
    toast.success('仓库已删除');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'local':
        return <HardDrive className="h-4 w-4" />;
      case 'sftp':
        return <Server className="h-4 w-4" />;
      case 'rest':
        return <Globe className="h-4 w-4" />;
      default:
        return <Cloud className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    return REPOSITORY_TYPES.find(t => t.value === type)?.label || type;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-white/10 bg-zinc-950 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Key className="h-5 w-5 text-sky-400" />
            仓库管理
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            管理您的 restic 备份仓库配置
          </DialogDescription>
        </DialogHeader>

        {isAdding ? (
          <RepositoryForm
            onSubmit={handleAdd}
            onCancel={() => setIsAdding(false)}
          />
        ) : editingRepo ? (
          <RepositoryForm
            repository={editingRepo}
            onSubmit={handleUpdate}
            onCancel={() => setEditingRepo(null)}
          />
        ) : (
          <div className="space-y-4">
            {/* Repository List */}
            <div className="max-h-[400px] space-y-2 overflow-y-auto">
              {repositories.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-zinc-900/50 py-8">
                  <Folder className="h-12 w-12 text-zinc-600" />
                  <p className="mt-2 text-sm text-zinc-500">暂无仓库配置</p>
                  <p className="text-xs text-zinc-600">点击下方按钮添加仓库</p>
                </div>
              ) : (
                repositories.map((repo) => (
                  <div
                    key={repo.id}
                    className={`group relative rounded-lg border p-4 transition-all ${
                      currentRepository?.id === repo.id
                        ? 'border-sky-500/50 bg-sky-500/10'
                        : 'border-white/5 bg-zinc-900/50 hover:border-white/10 hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          currentRepository?.id === repo.id
                            ? 'bg-sky-500/20 text-sky-400'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          {getTypeIcon(repo.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-zinc-200">{repo.name}</h4>
                            {currentRepository?.id === repo.id && (
                              <Badge className="bg-sky-500/20 text-sky-400 border-sky-500/30">
                                <Check className="mr-1 h-3 w-3" />
                                当前
                              </Badge>
                            )}
                          </div>
                          <p className="mt-0.5 text-sm text-zinc-500">{getTypeLabel(repo.type)}</p>
                          <code className="mt-1 block text-xs text-zinc-600 truncate">{repo.url}</code>
                          {repo.lastSyncAt && (
                            <p className="mt-1 text-xs text-zinc-600">
                              上次同步: {new Date(repo.lastSyncAt).toLocaleString('zh-CN')}
                            </p>
                          )}
                          {/* Show custom vars and params count */}
                          <div className="mt-2 flex items-center gap-2">
                            {repo.customVars.length > 0 && (
                              <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-500">
                                <Variable className="mr-1 h-3 w-3" />
                                {repo.customVars.length} 变量
                              </Badge>
                            )}
                            {repo.customParams.length > 0 && (
                              <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-500">
                                <Terminal className="mr-1 h-3 w-3" />
                                {repo.customParams.length} 参数
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        {currentRepository?.id !== repo.id && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              onSwitch(repo.id);
                              toast.success(`已切换到: ${repo.name}`);
                            }}
                            className="h-8 text-zinc-400 hover:text-sky-400"
                          >
                            <ExternalLink className="mr-1 h-4 w-4" />
                            切换
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingRepo(repo)}
                          className="h-8 w-8 text-zinc-400 hover:text-zinc-200"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirmId(repo.id)}
                          className="h-8 w-8 text-zinc-400 hover:text-rose-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Button */}
            <Button
              onClick={() => setIsAdding(true)}
              className="w-full border border-dashed border-white/20 bg-transparent text-zinc-400 hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-400"
            >
              <Plus className="mr-2 h-4 w-4" />
              添加新仓库
            </Button>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
          <DialogContent className="border-white/10 bg-zinc-900 text-zinc-100">
            <DialogHeader>
              <DialogTitle>确认删除仓库?</DialogTitle>
              <DialogDescription className="text-zinc-400">
                此操作将删除仓库配置，但不会删除实际的备份数据。
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteConfirmId(null)}
                className="border-white/10 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              >
                取消
              </Button>
              <Button
                onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
                className="bg-rose-500 text-white hover:bg-rose-600"
              >
                删除
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
